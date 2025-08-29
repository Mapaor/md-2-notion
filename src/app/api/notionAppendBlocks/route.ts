import { Client } from '@notionhq/client';
import { NextRequest } from 'next/server';
import type { AppendBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

export async function POST(req: NextRequest) {
  console.log('Rebent petició POST');
  try {
    const body = await req.json();
    const { pageId, notionToken, markdown } = body;

    if (!pageId || !notionToken) {
      return new Response(JSON.stringify({ error: 'Falten el blockId o el notionToken' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!markdown) {
      return new Response(JSON.stringify({ error: 'Falta el contingut Markdown' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse the markdown JSON if it's a string
    let blocks;
    try {
      blocks = typeof markdown === 'string' ? JSON.parse(markdown) : markdown;
    } catch {
      return new Response(JSON.stringify({ error: 'Format JSON del Markdown no vàlid' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ensure blocks is an array
    if (!Array.isArray(blocks)) {
      blocks = [blocks];
    }

    const notion = new Client({ auth: notionToken });
    const response: AppendBlockChildrenResponse = await notion.blocks.children.append({
      block_id: pageId,
      children: blocks,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    let errorMsg = 'Error desconegut';
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMsg = error.message;
      
      // Check if it's an access/permission error
      if (error.message.includes('Could not find block with ID') ||
          error.message.includes('Could not find page with ID') ||
          error.message.includes('page not found') || 
          error.message.includes('Unauthorized') || 
          error.message.includes('Forbidden') ||
          error.message.includes('object_not_found') ||
          error.message.includes('restricted_resource') ||
          error.message.includes('Make sure the relevant pages and databases are shared with your integration')) {
        statusCode = 403; // Forbidden - no access
        errorMsg = 'Page not accessible by integration';
      } else {
        // Only log unexpected errors
        console.error('Notion API Error:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Full error object:', error);
      }
    }
    
    return new Response(JSON.stringify({ 
      error: errorMsg, 
      details: error instanceof Error ? error.message : 'Unknown error',
      accessDenied: statusCode === 403
    }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
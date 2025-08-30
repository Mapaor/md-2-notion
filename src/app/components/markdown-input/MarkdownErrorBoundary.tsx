import React from 'react';

interface MarkdownErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  content?: string;
}

interface MarkdownErrorBoundaryState {
  hasError: boolean;
  lastContent: string;
  errorCount: number;
}

export class MarkdownErrorBoundary extends React.Component<MarkdownErrorBoundaryProps, MarkdownErrorBoundaryState> {
  constructor(props: MarkdownErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, lastContent: '', errorCount: 0 };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.warn('Markdown preview error caught by boundary:', error.message);
    // If it's the known remarkGfm error, we know the fallback will work
    if (error.message.includes('inTable') || error.message.includes('this.data is undefined')) {
      console.info('Known remarkGfm error detected, falling back to basic markdown');
    }
  }

  componentDidUpdate(prevProps: MarkdownErrorBoundaryProps): void {
    // Reset error state when content actually changes
    if (this.props.content !== prevProps.content && this.props.content !== this.state.lastContent) {
      if (this.state.hasError) {
        // Reset immediately when content changes for remarkGfm errors
        setTimeout(() => {
          this.setState({ 
            hasError: false, 
            lastContent: this.props.content || '',
            errorCount: this.state.errorCount + 1
          });
        }, 100); // Very fast reset for better UX
      } else {
        this.setState({ lastContent: this.props.content || '' });
      }
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

## 1. Interpolació $i$ arrels de funcions

1.1 INTERPOLACIÓ DE FUNCIONS

NO coneixem la FUNCIÓ ANALÍTICA $\longrightarrow$ en coneixem un CONJUNT FINIT D'ABCISSES

\[
\rightarrow\left\{x_{1}, f\left(x_{1}\right)\right\},\left\{x_{2}, f\left(x_{2}\right)\right\}, \ldots,\left\{x_{n}, f\left(x_{n}\right)\right\}
\]

* Interpolació: obtenció de punts intermedis als coneguts per conèixer l'estructura de la funció

En els punts intermedis tindrem una aproximació contínva i DERIVABLE de les dades conegudes
$\rightarrow$ INTERPOLACIÓ PER POLINOMIS DE LAGRANGE
$\forall k=0,1,2, \ldots n \quad \exists!$ polinomi $e_{k}$ de grau $\leqslant n \left\lvert\, e_{k}\left(x_{j}\right)=\delta_{k j} \longrightarrow e_{k}(z)=\frac{\left(z-x_{0}\right) \cdots\left(z-x_{k-1}\right)\left(z-x_{k+1}\right) \cdots\left(z-x_{n}\right)}{\left(x_{k}-x_{0}\right) \cdots\left(x_{k}-x_{k-1}\right)\left(x_{k}-x_{k+1}\right) \cdots\left(x_{k}-x_{n}\right)}=\sum_{k \neq i=0}^{n} \frac{\left(z-x_{k}\right)}{\left(x_{i}-x_{k}\right)}\right.$

Polinomi interpolador de Lagrauge: $P_{n}(x)=y_{0} l_{0}(x)+y_{1} l_{1}(x)+\ldots+y_{n} l_{n}(x) \rightarrow$ Equivalent a la funció que busquem
$\rightarrow$ INTERPOLACIÓ LINEAL (corvatura)
ús de dos punts per obtenir-ne un de tercer intermig $(x, y) \longrightarrow\left(x_{a}, y_{a}\right),\left(x_{b}, y_{b}\right) \left\lvert\, y=y_{a}+\left(x-x_{a}\right) \frac{y_{b}-y_{a}}{x_{b}-x_{a}}\right.$
$\rightarrow$ INTERPOLACIÓ QUADRÀTICA (inflexions)
similar a la lineal peró auf 3 punts $\rightarrow\left(x_{0}, y_{0}\right),\left(x_{1}, y_{1}\right),\left(x_{2}, y_{2}\right) \left\lvert\, y=y_{0} \frac{\left(x-x_{1}\right)\left(x-x_{2}\right)}{\left(x_{0}-x_{1}\right)\left(x_{1}-x_{2}\right)}+y_{1} \frac{\left(x-x_{0}\right)\left(x-x_{2}\right)}{\left(x_{1}-x_{0}\right)\left(x_{0}-x_{2}\right)}+y_{2} \frac{\left(x-x_{0}\right)\left(x-x_{1}\right)}{\left(x_{2}-x_{0}\right)\left(x_{2}-x_{1}\right)}\right.$
1.2 ARRELS DE FUNCIONS

Trobar els zeros d'una funció donada $\longrightarrow x_{k} \in \mathbb{R} \mid f\left(x_{k}\right)=0$
$\longrightarrow$ MÉTODE DE LA BISECCCIO
*T. de Bolzano: sigui $x=a$ i $x=b$ aut $b>a|f(a) \cdot f(b)<0 \longrightarrow \exists x=c \in(a, b)| f(c)=0$

Definim $c=\frac{a+b}{2}$ i avaluem $f(c)$ :

1. $f(c) \cdot f(a) c 0 \longrightarrow$ redefinim $l^{\prime}$ interval en $[a, c]_{b \rightarrow c}^{a \rightarrow a}$ i repetim
2. $f(c) \cdot f(b)<0 \rightarrow$ redefinim e'interval en $[c, b]\left[\begin{array}{l}a \rightarrow c \\ b \rightarrow b\end{array}\right.$ i repetim
3. $f(c)=0 \longrightarrow j a$ hem trobat la soluciói acabem

Quan $(b-a)<\varepsilon$ haurem obtingut la precisio que buscavem.
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-01.jpg?height=238&width=423&top_left_y=1695&top_left_x=1304)

* propietats - sempre convergeix
- l'error disminueix en un factor 2 en cada iteració $\rightarrow$ el nou error és proporcional a l'auterior
$\rightarrow$ MÉTODE REGULA-FALSI
Similar al de la bisecció pero el punt $x=c$ correspon al tall entre la recta que passa per $(a, f(a))$ i $(b, f(b)) i \ell^{\prime}$ eix d'abcisses. Iniciem $\ell^{\prime}$ interval $[a, b] \mid f(a) f(b)<0$

Definim $c=\frac{a f(0)-b f(a)}{f(b)-f(a)}$; avaluem $f(c)$ :

1. $f(a) f(c)<0 \rightarrow$ redefinim l'interval aub $b=c$
2. $f(b) f(c)<0 \rightarrow$ redefinim l'interval auts $a=c$
3. $f(c)=0 \rightarrow j a$ hem trobat la solucic i acalem
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-01.jpg?height=235&width=492&top_left_y=2386&top_left_x=1284)

El criteri de convergència consisteix en min $(c-a, b-c)<\varepsilon$

1. Comencem aub un valor $x_{0}$ relativament proper a e'arrel que busquem
2. Polinomi de taylor al voltant de $x_{0} \longrightarrow T_{1}\left(x: x_{0}\right)=f\left(x_{0}\right)+\left(x-x_{0}\right) f^{\prime}\left(x_{0}\right)$
3. Resolem el problema lineal $T_{1}\left(x_{1} ; x_{0}\right)=0 \rightarrow x_{1}=x_{0}-\frac{f\left(x_{0}\right)}{f^{\prime}\left(x_{0}\right)}$
criteri de convergència $\longrightarrow$ si $\left|\Delta_{1}\right|=\left|x_{1}-x_{0}\right|<\varepsilon$ finalizem (en cas contrari, $x_{0}=x_{1}$ i repetim)
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-02.jpg?height=272&width=1454&top_left_y=462&top_left_x=228)

A cada iteració s'obté una millora quadràtica de l'error.
Pot donar-se el cas de que $f^{\prime}\left(x_{0}\right) \sim 0$, de mauera que ens allunyem de la solució. si el pendent de la derivada és oposat al que ens interessa, obtinarem una altra arrel 0 el mètode divergirà.
$\rightarrow$ MÈTODE DE LA SECANT
variant del mètode de Newton-Raphson si $\rightarrow$ NO coneixem la derivada de la funció
$\rightarrow$ la derivada s'anutla en un punt
En aquests casos, canviem la derivada a $x_{0}$ pel pendent de la secant emprant dos punts propers:

$$
x_{n+1}=x_{n}-f\left(x_{n}\right) \frac{x_{n}-x_{n-1}}{f\left(x_{n}\right)-f\left(x_{n-1}\right)}
$$

Per emprar el mètode, necessitem dos punts inicials $\left(x_{0} i x_{1}\right)$ que idealment són propers a e'arrel $i$ entre si. Convergeix lleugerament més lent que el mètode de Newton-Raphson.

## 2. Integració numérica

Els mètodes d'integració numèrica es basen en aproximar la integral al sumatori que inclou valors discrets de punts coneguts dins e'interval d'integració.

$$
\int_{a}^{b} f(x) d x \simeq \sum_{k=0}^{N} f\left(x_{k}\right) \omega_{k} \longrightarrow \text { funció pes; indica la contribucio del valor de la funció al punt }
$$

### 2.1 INTEGRACIÓ TANCADA

Inclouen els punts de la frontera de e'interval $\rightarrow$ INTEGRAL DEFINIDA

## $\rightarrow$ MÈTODE DELS TRAPEZIS

Aproximació lineal entre dos punts consecutius ( $x_{0}, f\left(x_{0}\right)$ ); ( $x_{1}, f\left(x_{1}\right)$ )
Polinomi interpolador: $P_{1}(x)=f\left(x_{0}\right)+\frac{x-x_{0}}{h}\left(f\left(x_{1}\right)-f\left(x_{0}\right)\right) \longrightarrow \int_{x_{0}}^{x_{1}} f(x) d x \simeq \int_{x_{0}}^{x_{1}} P_{1}(x) d x=\frac{h}{2}\left(f\left(x_{0}\right)+f\left(x_{1}\right)\right) \rightarrow \underset{\text { trapezi }}{\text { àrea }}$

$$
h=x_{1}-x_{0} \quad(\equiv p a s)
$$

l'error comès en l'integració per un sub-interval $h$ creix com $h^{3} \rightarrow E_{r} \simeq-\frac{h^{3}}{12} f^{\prime \prime}(\xi) \quad \xi \in\left[x_{0}, x_{1}\right]$

## $\rightarrow$ MÈTODE DE SIMPSON

Aproximació quadrática (parábola) entre 3 punts consecutius
Polinomi interpolador: $P_{2}(x)=f_{0}+\frac{x-x_{0}}{2 h}\left(4 f_{1}-3 f_{0}-f_{2}\right)+\frac{\left(x-x_{0}\right)^{2}}{2 h^{2}}\left(f_{0}-2 f_{1}+f_{2}\right) \longrightarrow \int_{x_{0}}^{x_{2}} f(x) d x \simeq \frac{h}{3}\left(f_{0}+4 f_{1}+f_{2}\right)$
L'error comès en l'integració per un sub-interval $h$ creix com $h^{5} \rightarrow E_{r} \simeq-\frac{h^{5}}{90} f^{\text {II }}(\xi) \quad \xi \in\left[x_{0}, x_{2}\right]$
$\rightarrow$ MÈTODE DE SIMPSON-3/8
Aproximació cúbica entre 4 punts consecutius
A partir del polinomi interpolador calculem la integral $\longrightarrow \int_{x_{0}}^{x_{3}} f(x) d x \simeq \frac{3 h}{8}\left(f_{0}+3 f_{1}+3 f_{2}+f_{3}\right)$
L'error comès en l'integració per un sub-interval $h$ creix com $h^{5} \rightarrow E_{r} \simeq-\frac{3 h^{5}}{80} f^{\prime \prime}(\xi)$ aub $\xi \in\left[x_{0}, x_{3}\right]$
$\rightarrow$ MÈTODE DE BOOLE
Aproximació quarta entre 5 punts consecutius
A partir del polinomi interpolador calculem la integral $\longrightarrow \int_{x_{0}}^{x_{4}} f(x) d x \simeq \frac{2 h}{45}\left(7 f_{0}+32 f_{1}+12 f_{2}+32 f_{3}+7 f_{4}\right)$

L'error comès en l'integració per un sub-interval $h$ creix com $h^{7} \rightarrow E_{r} \simeq-\frac{8 h^{7}}{945} f^{\text {IV }}(\xi)$ aub $\xi \in\left[x_{0}, x_{4}\right]$

A partir dels diferents mètodes d'integració obtenim un resultat exacte per:
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-03.jpg?height=286&width=449&top_left_y=862&top_left_x=82)
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-03.jpg?height=289&width=452&top_left_y=862&top_left_x=536)
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-03.jpg?height=283&width=449&top_left_y=862&top_left_x=993)
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-03.jpg?height=286&width=449&top_left_y=862&top_left_x=1444)

### 2.2 INTEGRACIÓ AMB REPETICIÓ

Els mètodes d'integració esmentats anteriorment es poden encadenar per tal d'estendre el càlcul a intervals complets $[a, b] \rightarrow \int_{a}^{b} f(x) d x$
Tenim $f(x)$ definida en un conjunt de $N+1$ punts equiespaiats $h$ en $[a, b]$

$$
\rightarrow x_{k}=x_{0}+k h \quad a u b \quad\left\{\begin{array}{l}
x_{0} \equiv a \\
k \in \mathbb{N}+\{0\} \\
x_{n} \equiv b
\end{array} \quad \text { i } h=\frac{b-a}{N} \quad(\equiv \text { pas })\right.
$$

$\rightarrow$ MÈTODE DELS TRADEZIS AMB REPETICIÓ
Integral $\longrightarrow \int_{a}^{b} f(x) d x=\sum_{k=0}^{N-1} \int_{x_{k}}^{x_{k+1}} f(x) d x=h \sum_{\substack{\text { Regea dels Traperis } \\=}}^{N-1} \frac{f_{k}+f_{k+1}}{2} \longrightarrow \int_{a}^{b} f(x) d x=h\left\lfloor\frac{f_{0}}{2}+f_{1}+f_{2}+\ldots+f_{n-1}+\frac{f_{n}}{2}\right\rceil$
Error $\longrightarrow$ Err $\alpha N \times h^{3}=(b-a) h^{2}$

* si la funció s'anul.la als extrems: $\int_{a}^{b} f(x) d x \simeq h \sum_{k} f_{k}$
$\rightarrow$ MÈTODE DE SIMPSON AMB REPETICIÓ

$$
\text { Integral } \longrightarrow \int_{a}^{b} f(x) d x=\sum_{k=0}^{N / 2-1} \int_{x_{2 k}}^{x_{2 k+2}} f(x) d x \underset{\substack{\text { Regaa de Simpson } \\=}}{\frac{h}{3} \sum_{k=0}^{N / 2-1}}\left(f_{2 k}+4 f_{2 k+1}+f_{2 k+2}\right) \rightarrow \int_{a}^{b} f(x) d x \simeq \frac{h}{3}\left[f_{0}+4 f_{1}+2 f_{2}+4 f_{3}+\cdots+4 f_{n-1}+f_{n}\right]
$$

Error $\longrightarrow$ Err $\propto N \times h^{5}=h^{4}$
$\rightarrow$ MÈTODE DE SUMA D'EULER-MCLAURIN
Aproximació de l'error comès en utilizar el mètode dels trapezis (millora del mètode)
$\rightarrow$ Taylor per $x_{0} \rightarrow \int_{x_{0}}^{x_{1}} f(x) d x=h f\left(x_{0}\right)+\frac{h^{2}}{2!} f^{\prime}\left(x_{0}\right)+\frac{h^{2}}{3!} f^{\prime \prime}\left(x_{0}\right)+\frac{h^{4}}{4!} f^{\prime \prime \prime}\left(x_{0}\right)+\cdots$
$\rightarrow$ Taylor per $x_{1} \rightarrow \int_{x_{0}}^{x_{1}} f(x) d x=h f\left(x_{1}\right)-\frac{h^{2}}{2!} f^{\prime}\left(x_{1}\right)+\frac{h^{3}}{3!} f^{\prime \prime}\left(x_{1}\right)-\frac{h^{4}}{4!} f^{\prime \prime \prime}\left(x_{1}\right)+\cdots$
seguim treballant aub desenvompanents de Taylor fins a obtenir la següent expressió:

$$
\int_{a}^{b} f(x) d x=h\left[\frac{f_{0}}{2}+f_{1}+f_{2}+\cdots+f_{n-1}+\frac{f_{n}}{2}\right]-\frac{h^{2}}{12}\left[f^{\prime}(b)-f^{\prime}(a)\right]+\frac{h^{4}}{720}\left[f^{\prime \prime \prime}(b)-f^{\prime \prime \prime}(a)\right]+\cdots
$$

$\rightarrow$ Mètode DE ROMBERG
Millora la precissió del mètode dels trapezis basaut-se en e'estructura de la fórmula d'Euler-Mclaurin Considerem la fórmula trapezoidal laurs $N$ intervals)
$\times 2 N\left(\begin{array}{l}\int_{a}^{b} f(x) d x=T_{N}+\frac{h^{2}}{12}\left(f^{\prime}(a)-f^{\prime}(b)\right)+\ldots \\ \int_{a}^{b} f(x) d x=T_{2 N}+\frac{h^{2}}{48}\left(f^{\prime}(a)-f^{\prime}(b)\right)+\ldots\end{array}\right\}$ cancel.lem el terme quadràtic: $\int_{a}^{b} f(x) d x=\frac{4 T_{2 N}-T_{N}}{3}+O\left(h^{4}\right)$

| Número de intervalos | $2^{0}=1$ | $2^{1}=2$ | $2^{2}=4$ | $2^{3}=8$ | $2^{4}=16$ | Orden en $h$ |  |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|  | $T_{0,0}$ | $T_{1,0}$ | $T_{2,0}$ | $T_{3,0}$ | $T_{4,0}$ | $T_{5,0}$ | $\mathcal{O}\left(h^{2}\right)$ |
|  |  | $T_{1,1}$ | $T_{2,1}$ | $T_{3,1}$ | $T_{4,1}$ | $T_{5,1}$ | $\mathcal{O}\left(h^{4}\right)$ |
|  |  |  | $T_{2,2}$ | $T_{3,2}$ | $T_{4,2}$ | $T_{5,2}$ | $\mathcal{O}\left(h^{6}\right)$ |
|  |  |  |  | $T_{3,3}$ | $T_{4,3}$ | $T_{5,3}$ | $\mathcal{O}\left(h^{8}\right)$ |
|  |  |  |  |  | $T_{4,4}$ | $T_{5,4}$ | $\mathcal{O}\left(h^{10}\right)$ |
|  |  |  |  |  |  | $T_{5,5}$ | $\mathcal{O}\left(h^{10}\right)$ |

Per un nombre determinat d'intervals la millor precisió és la Tmm. Per obtenir aquest valor ens cal conèixer tots els de la seva columna i els que hi ha a la seva esquerra.

Definim $\quad T_{m 0}=T\left(2^{m}\right)$ (Trapezis amb $2^{m}$ intervals).

1. Calculem per $m=0 \quad(1$ interval $) \longrightarrow T_{00}=\frac{h}{2}(f(a)+f(b))$
2. Calculem per $m=1 \rightarrow T_{10}=T_{\infty 0}+h f\left(\frac{a+b}{2}\right)$
$\rightarrow T_{11}=\frac{4 T_{10}-T_{00}}{3} \quad a m b \quad E_{r} \propto h^{2}$
3. Avaluem la convergència: $\Delta_{i}=\left|T_{11}-T_{00}\right|$
$\rightarrow$ si $\Delta<\varepsilon \rightarrow$ ens quedem $T_{M}$
$\rightarrow$ si $\quad \Delta>\varepsilon \rightarrow$ seguim per $m=2$ com $T_{m+k, k}=\frac{4^{k} T_{m+k, k-1}-T_{m+k-1, k-1}}{4^{k}-1}$

### 2.3 INTEGRACIÓ OBERTA

Les fórmules al integració no depenen del valor de la funció als extrems de e'interval

## $\rightarrow$ QUADRATURA DE GAUSS- LEGENDRE

Quadratura construida per obtenir el resultat exacte en e'integracić de polinomis.
Es sol definir per l'interval $(a, b)=(-1,1) \longrightarrow \int_{a}^{b} f(x) d x=\int_{-1}^{1} g(u) d u$

$$
u=-1+2 \frac{x-a}{b-a} \rightarrow \begin{gathered}
\text { canvi de } \\
\text { variables lineal }
\end{gathered}
$$

Busca trobar uns punts $x_{k} i$ els seus pesos corresponents $\omega_{k}$ de mauera que integrem de manera exacta els polinomis fins un grau determinat $2 n-1$ tal que $x^{0}, x^{1}, x^{2}, \ldots, x^{2 n-1}$

De forma general, utilizem els POLINOMIS DE LEGENDRE:

$$
\left.\begin{array}{l}
\rightarrow P_{0}(x)=1 \\
\rightarrow P_{1}(x)=x \\
\rightarrow(n+1) P_{n+1}(x)=(2 n+1) x P_{n}(x)-n P_{n-1}(x)
\end{array}\right\} \operatorname{per}[-1,1] \rightarrow \int_{-1}^{1} P_{k}(x) P_{k^{\prime}}(x) d x=\delta_{k k^{\prime}} \frac{2}{2 k+1}
$$

* Important: $\rightarrow$ els punts $x_{k}$ NO estan equiespaiats
$\rightarrow$ hi ha més densitat de punts als extrems que al centre
$\rightarrow$ Amb $n=24$ o $n=48$ tenim bona precisio
$\rightarrow$ Permet integrar funcions amb singularitats integrables als extrems
$\rightarrow$ Amb canvis de variables canvia la densitat de punts on ens interessa


### 2.4 INTEGRALS IMPRÔPIES

$\rightarrow$ INTERVALS D'INTEGRACIÓ INFINITS del tipus $\int_{a}^{\infty} f(x) d x$
$\rightarrow$ Escollir un xmax on es cregui que la integral ja no contribueix
$\rightarrow$ Canvi de variable transformant e'interval infinit en finit
$\rightarrow$ AMB SINGULARITATS DE MESURA NULLA per exemple $\int_{0}^{1} \frac{1}{\sqrt{x}} d x=2$
$\rightarrow$ Canvi de variable que transformi $f(x) \rightarrow g(u)$ sense singularitats
$\rightarrow$ Integrar en l'interval $(a+h, b-h)$

## $\rightarrow A M B$ DERIVADES SINGULARS

No presenten cap problema però la convergència no serà l'esperada (ja que per l'estudi d'aquesta hem requerit de derivades contínues $i$ diferenciables)
$\rightarrow$ Canvi de variable per fer diferenciable al punt la devivada

## $\longrightarrow$ MÉTODES ADAPTATIUS

construcció d'algorismes que s'adapten a l'integrand tal que avaluem la funció més cops a la zona on té més estructura.

## $\longrightarrow$ INTEGRALS MULTIDIMENSIONALS

Sempre que sigui possible, realizem les integrals a mode seqüencial (primer una variable $i$ després $\ell^{\prime}$ altra)

$$
\iint f(x, y) d x d y=\int d y F(x, y) \longrightarrow F(x, y)=\int_{x_{m}(y)}^{x_{m}(y)} f(x, y) d x
$$

### 2.5 CÁLCUL DE DERIVADES

sigui una funció $f(x)$ definida en $x \in[a, b]$. discretizarem la variable $x$ amb un pas $h$ obtenint un conjunt de $N+1$ valors $\left\{x_{k}\right\}$
$\rightarrow$ fórmula avançada: $f^{\prime}\left(x_{k}\right)=\frac{f\left(x_{k+1}\right)-f\left(x_{k}\right)}{h}+O(h)$
$\rightarrow$ fórmula central : $f^{i}\left(x_{k}\right)=\frac{f\left(x_{k+1}\right)-f\left(x_{k-1}\right)}{2 h}+O\left(h^{2}\right)$
utilizen 2 punts pel càlcul
$\rightarrow$ fórmula endarrerida: $\quad f^{\prime}\left(x_{k}\right)=\frac{f\left(x_{k}\right)-f\left(x_{k-1}\right)}{h}+O(h)$
$\rightarrow$ fórmula millorada: $f^{\prime}\left(x_{k}\right)=\frac{-f\left(x_{k+2}\right)+8 f\left(x_{k+1}\right)-8 f\left(x_{k-1}\right)+f\left(x_{k-2}\right)}{12 h}+0\left(h^{4}\right) \rightarrow 5$ punts

Per la segona derivada apliquem dues vegades el càlcul anterior:

$$
\begin{aligned}
& \rightarrow \text { aub } h: f^{\prime \prime}\left(x_{k}\right)=\frac{f^{\prime}\left(x_{k+1}\right)-f^{\prime}\left(x_{k-1}\right)}{2 h}=\cdots=\frac{f\left(x_{k+2}\right)-2 f\left(x_{k}\right)+f\left(x_{k-2}\right)}{4 h^{2}}+O\left(h^{2}\right) \\
& \rightarrow \text { amb } 2 h: f^{\prime \prime}\left(x_{k}\right)=\frac{f\left(x_{k+1}\right)-2 f\left(x_{k}\right)+f\left(x_{k-1}\right)}{h^{2}}+O\left(h^{2}\right)
\end{aligned}
$$

## 3. Nombres aleatoris $i$ Integració de Monte-Carlo

3.1 VARIABLES ALEATÒRIES
sigui un conjunt de valors que pot prendre una variable (suport) es té una funció que proporciona la probabilitat (o densitat de probabilitat) de prendre aquests valors.
$\rightarrow$ variable discreta: conjunt numeralle $\left\{x_{k}\right\}$ amb $k=1,2, \ldots$ valors
probabilitats $\rightarrow P_{k} \equiv \lim _{N \rightarrow \infty} \frac{N \text { de cops que hem obtingut } x_{k}}{N \text { total de mesures }}$ tal que $\sum_{k} P_{k}=1$
$\rightarrow$ variable contínua: conjunt continu de valors definit per una densitat de probabilitat densitat $\rightarrow \rho(x)=P\left\{x \mid x_{1}<x<x_{1}+d x\right\} \equiv \lim _{N \rightarrow \infty} \frac{\text { cops que obtenim } x_{1}<x<x_{1}+d x}{N \text { total de mesures }}$ tal que $\int \rho(x) d x=1$
$\rightarrow$ FUNCIONS DE VARIABLES ALEATÒRIES
sigui $x$ una variable aleatòria aub densitat de probabilitat $\rho(x)$ tindrem que $y=f(x)$ taule serà una variable aleatòria.

$$
\rho(x) d x=g(y) d y \rightarrow g(y)=\rho(x)\left|\frac{d x}{d y}\right|=\rho\left(f^{-1}(y)\right)\left|\frac{d f^{-1}(y)}{d y}\right| \quad \text { sempre que } f(x) \text { sigui unívoca }
$$

## $\rightarrow$ PROBABILITAT ACUMULADA

sigui $x$ una V.A. auf densitat de probabilitat $\rho(x) \rightarrow P(x) \equiv \int_{x_{\text {min }}}^{x} \rho\left(x^{\prime}\right) d x^{\prime}$ amb $\frac{d P(x)}{d x}=\rho(x) \quad i\left\{\begin{array}{l}P_{\text {min }}\left(x_{\text {min }}\right)=0 \\ P_{\text {max }}\left(x_{\text {max }}\right)=1\end{array}\right.$ I donat un interval $[a, b] \rightarrow P\{x \mid a<x<b\}=\int_{a}^{b} p(x) d x=P(b)-P(a)$
Per variables discretes: $P(x)=\sum_{x_{k}<x} \rho_{k} \quad$ aub $\quad \rho(x)=\sum_{k} \rho_{k} \delta\left(x-x_{k}\right)$

## $\rightarrow$ VALORS ESPERATS I MOMENTS DE LA DISTRIBUCIÓ

Sigui $x$ una V.A. auf densitat de probabilitat $\rho(x)$, es defineix el promig de la funció $g(x)$ com:

$$
E(g(x))=\langle g(x)\rangle=\int_{s} \rho(x) g(x) d x \quad \text { (continues) } \quad E(g(x))=\langle g(x)\rangle=\sum_{k} \rho_{k} g\left(x_{k}\right) \quad \text { (discretes) }
$$

$$
\text { * propietats: } \quad \begin{array}{ll} 
& -\langle f(x)+a\rangle=\langle f(x)\rangle+a \quad \forall a \in \mathbb{R} \\
& -\langle a f(x)\rangle=a\langle f(x)\rangle \quad \forall a \in \mathbb{R} \\
& -(f(x)+g(x)\rangle=(f(x))+\langle g(x)\rangle
\end{array}
$$

Del que fa al moment de la distribució de probabilitat $\longrightarrow m_{n} \equiv\left\langle x^{n}\right\rangle=\int_{s} x^{n} \varphi(x) d x$
La variància $\longrightarrow \operatorname{var}(x) \equiv\left\langle(x-(x))^{2}\right\rangle=\int_{s}(x-\langle x\rangle)^{2} \rho(x) d x=m_{2}-m_{1}^{2}$
Indica com d'allunyats estan els possibles valors de $x$ del seu valor esperat
La desviació eständard $\rightarrow \sigma_{x}=\sqrt{\operatorname{var}(x)}$
Indica l'amplada de la distribució

* variable adimensional normalizada $x^{*}=\frac{(x-\langle x\rangle)}{\sigma_{x}} \quad\left\{\begin{array}{l}\text { valor mitjà }\left\langle x^{*}\right\rangle=0 \\ \text { desviació eständard } \sigma_{x^{*}}=1\end{array}\right.$


## $\rightarrow$ MÚLTIPLES VARIABLES

Sigui un conjunt de variables aleatòries: $\quad \rho\left(x_{1}, x_{2} \ldots x_{n}\right) \longrightarrow \int_{S} d x_{1} d x_{2} \ldots d x_{n} \quad \rho\left(x_{1}, x_{2}, \ldots x_{n}\right)=1$
Taulé podeue definir $\longrightarrow$ funció de $n$ V.A: $\left\langle f\left(x_{1}, x_{2} \ldots x_{n}\right)\right\rangle=\int_{S} d x_{1} d x_{2} \ldots d x_{n} \quad f\left(x_{1}, x_{2} \ldots x_{n}\right) \rho\left(x_{1}, x_{2} \ldots x_{n}\right)$

$$
\rightarrow \text { valor esperat: }\left\langle x_{i}\right\rangle=\int_{S} d x_{1} d x_{2} \ldots d x_{n} x_{i} \rho\left(x_{1}, x_{2} \ldots x_{n} \quad \text { amb } i=1,2, \ldots n\right.
$$

la coorariancia mesura la relació entre dos valors esperats $\rightarrow \operatorname{cov}\left(x_{i}, x_{j}\right)=\left\langle\left(x_{i}-\left\langle x_{i}\right\rangle\right)\left(x_{j}-\left\langle x_{j}\right\rangle\right)\right\rangle=\left\langle x_{i} x_{j}\right\rangle-\left\langle x_{i}\right\rangle\left\langle x_{j}\right\rangle$ coeficients de relació entre 2 variables $\rightarrow \rho_{i j}=\rho\left(x_{i}, x_{j}\right)=\frac{\operatorname{cov}\left(x_{i}, x_{j}\right)}{\nabla_{x_{i}} \sigma_{x_{j}}}$

La probabilitat marginal és la probabilitat de mesurar $x_{i}$ independentment de les altres variables

$$
\begin{aligned}
& \longrightarrow P_{i}\left(x_{i}\right)=\int_{S} d x_{1} d x_{2} \ldots d x_{i-1} d x_{i+1} \ldots d x_{n} \quad \rho\left(x_{1}, x_{2} \ldots x_{n}\right) \\
& \longrightarrow \text { variables independents } \longrightarrow p\left(x_{1}, x_{2} \ldots x_{n}\right)=\prod_{i} p_{i}\left(x_{i}\right) \longleftrightarrow\left\langle x_{i}, x_{j}\right\rangle=\left\langle x_{i}\right\rangle\left\langle x_{j}\right\rangle \quad \text { o } \rho\left(x_{i}, x_{j}\right)=0
\end{aligned}
$$

### 3.2 EXEMPLES DE DISTRIBUCIONS DE PROBABILITAT

## $\rightarrow$ DISTRIBUCIONS DISCRETES

distribució de Bernouilli:
considerem una v.A. i aub suport $\delta=\{0,1\} \longrightarrow$ probabilitat $\left\{\begin{array}{l}P(0)=q=p-1 \\ P(1)=p\end{array}\right.$

$$
\begin{aligned}
& \text { moment }\left(0^{n}\right) \rightarrow m_{n}=\left\langle i^{n}\right\rangle=\sum_{i=0}^{n} p_{i} i^{n}=0^{n} \cdot(1-p)+1^{n} \cdot p=p \\
& \text { variäncia } \rightarrow \operatorname{var}(i)=\left\langle(i-\langle i\rangle)^{2}\right\rangle=m_{2}-m_{1}^{2}=p(1-p)=p q
\end{aligned}
$$

* distribució finomial:
donada una V.A. $\begin{aligned} & \\ & \\ & \leftarrow \text { probablitat de } n \text { experiments sigui } k \text { aub } k \in\{0,1, \ldots n\}\end{aligned}$
$B(k ; n, p)=\binom{n}{p} p^{k}(1-p)^{k}=\frac{n!}{k!(n-k)!} p^{k}(1-p)^{n-k} \quad \longrightarrow$ valor esperat $\rightarrow\langle k\rangle=n p$
$\longrightarrow$ desviació estàndard $\left.\longrightarrow\left\langle k^{2}\right\rangle=n p \mid 1+(n-1) p\right)$
$\longrightarrow$ variäncia $\longrightarrow \operatorname{var}(k)=n p(1-p)$
* distribucio de Poisson
límit $N \rightarrow \infty$ de la distribució Binomial $\rightarrow P(k ; \lambda)=e^{-\lambda} \frac{\lambda^{k}}{k!}$ amb $\lambda=n p$
$\longrightarrow$ valor esperat $\rightarrow\langle k\rangle=n p=\lambda$
$\longrightarrow$ desviació eständard $\rightarrow\left\langle k^{2}\right\rangle=\lambda(\lambda+1)$
$\longrightarrow$ variància $\rightarrow \operatorname{var}(k)=\lambda$
La suma de dues variables de Poisson $\lambda_{1} ; \lambda_{2}$ segueix taulé una distribucić de Poisson aub $\lambda=\lambda_{1}+\lambda_{2}$
$\rightarrow$ DISTRIBUCIONS CONTÍNUES
* distribució uniforme
$U(a, b)$ per $y \in[a, b]$ tal que $p(y)=\frac{1}{b-a} \rightarrow P(y)=\int_{a}^{y} \rho\left(y^{\prime}\right) d y^{\prime}=\frac{y-a}{b-a}$
$\longrightarrow$ valor esperat $\rightarrow(y)=\frac{a+b}{2}$
$\longrightarrow$ desviació estàndard $\rightarrow \sigma_{y}=\frac{b-a}{\sqrt{12}}$
$\longrightarrow$ variäncia $\longrightarrow \operatorname{var}(y)=\frac{(a-b)^{2}}{12}$
* distribució exponencial

Exp $(a, b)$ per $y \in[0, \infty)$ tal que $\rho(y)=\gamma e^{-\gamma y} \longrightarrow P(y)=1-e^{-\gamma y}$
$\longrightarrow$ valor esperat $\rightarrow\langle y\rangle=1 / \gamma$
$\longrightarrow$ desviació estàndard $\rightarrow \sigma=1 / \gamma$
$\longrightarrow$ moment $\left(0^{n}\right) \rightarrow\left\langle y^{n}\right\rangle=n!/ y^{k}$

* distribució gaussiana o normal
donats $\left\{\begin{array}{l}\text { valor mitja } \mu \\ \text { variàucia } \sigma^{2}\end{array} \longrightarrow N\left(x_{i} \mu, \sigma\right) \equiv \frac{e^{-(x-\mu)^{2} / 2 \sigma^{2}}}{\sqrt{2 \pi} \sigma} \longrightarrow\right.$ error: $E_{r r}(x)=\int_{-\infty}^{x} N\left(x^{\prime} ; \mu, \sigma\right) d x^{\prime}$
probabilitat que la variable prengui un valor comprès entre ( $\mu-k \sigma, \mu+k \sigma$ ) aut $k=1,2, \ldots n$ ?

$$
P(x)=\int_{\mu-k \sigma}^{\mu+k \sigma} d x \frac{e^{-(1-\mu)^{2} / 2 \sigma^{2}}}{\sqrt{2 \pi} \sigma}=E_{r f}\left(\frac{k}{\sqrt{2}}\right)
$$

3.3 MÉTODES DE SAMPLEIG DE DENSITATS DE PROBABILITAT
un ordinador genera mombres pseudo-aleatoris distribuits uniformement en l'interval $(0,1)$. Cal doncs, buscar una variable aleatória que s'adapti al problema a'interval $(a, b)$
$\rightarrow$ MÈTODE DEL CANVI DE VARIABLE
fem el canvi $g(y) d y=p(x) d x \rightarrow g(y)=p\left(f^{-1}(y)\right)\left|\frac{d f^{-1}(y)}{d y}\right|$ (quan $f(x)$ sigui univoca)
Fixem la variable tal que $x \in(0,1): p(x)=1\left\{\begin{array}{l}f(0)=a \\ f(1)=b\end{array} \longrightarrow g(y)=\left|\frac{d f^{-1}(y)}{d y}\right|\right.$ tal que $P(y)=\int_{a}^{y} g\left(y^{\prime}\right) d y^{\prime}=f^{-1}(y)=x$

* dist. uniforme $\left.\quad x=\frac{y-a}{b-a} \rightarrow y=(b-a) x+a \right\rvert\, x \in U(0,1)$
* dist. exponencial $\left.y=-\frac{1}{8} \ln (1-x) \right\rvert\, x \in U(0,1)$
$\left.y=-\frac{1}{\gamma} \ln (x) \right\rvert\, x \in U(0,1]$
$\rightarrow$ MÉTODE DE BOX-MÜLLER
siguin $x_{1}$ i $x_{2}$ dues V.A. que segueixen una distribució gaussiana $\mu=0 ; \sigma=1$, el suport de les dues és una recta real. Prenent cada punt ( $x_{1}, x_{2}$ ) com a punts d'un pla $\longrightarrow P\left(x_{1}, x_{2}\right)=N\left(x_{1}, 0,1\right) N\left(x_{2}, 0,1\right) d x_{1} d x_{2}$
considerem un canvi de variables $\left\{\begin{array}{l}x_{1}=r \cos \varphi \\ x_{2}=r \sin \varphi\end{array}\right.$ aut $\left\{\begin{array}{l}r \in[0, \infty) \\ \varphi \in[0,2 \pi]\end{array} \longrightarrow P\left(x_{1}, x_{2}\right) d x_{1} d x_{2}=\frac{1}{2 \pi} e^{-\frac{x_{1}^{2}+x_{2}^{2}}{2}} d x_{1} d x_{2}=\frac{1}{2 \pi} e^{-\frac{r_{2}^{2}}{2}}\right.$ rdrd $\varphi$
Que equival a una nova densitat de probabilitat de dues variables independents (ri $\varphi$ ) auft

$$
\left\{\begin{array}{l}
p(r) d r=e^{-r^{2} / 2} r d r \longrightarrow \int_{0}^{\infty} r e^{-r^{2} / 2} d r=1 \\
g(\varphi) d \varphi=\frac{1}{2 \pi} d \varphi \rightarrow \int_{0}^{2 \pi} \frac{1}{2 \pi} d \varphi=1
\end{array}\right.
$$

Per variables distribuides segons $U(0,1)$ com $\left\{\begin{array}{l}\xi_{1} \in U(0,1) \\ \xi_{2} \in U(0,1)\end{array} \longrightarrow r=\sqrt{-2 \log \left(\xi_{1}\right)}\right.$ i $\varphi=2 \pi \xi_{2}$
$\rightarrow$ MÈTODE D'ACCEPTACIÓ - REBUIG
sigui una V.A. $y$ amb $\rho(y)<M$ (definida i acotada)

1. Obtenim dos nombres aleatoris $x \in U(a, b)$ i $p \in U(0, M)$
b els podem generar a partir de $x_{1}, x_{2} \in v(0,1)$ amb el canvi $\left\{\begin{array}{l}x=(b-a) x_{1}+a \\ p=M x_{2}\end{array}\right.$
2. si $\rho(x) \geqslant p \rightarrow$ acceptem el valor de $x \rightarrow y=x$
si $\rho(x)<p \rightarrow$ tornem al pas 1 (auts altres nombres aleatoris
Probabilitat de $y \rightarrow \bar{\rho}(y)=\int_{a}^{b} d x \frac{1}{b-a} \int_{0}^{M} d p \frac{1}{M} \delta(x-y) \theta(\rho(x)-p) \rightarrow \bar{\rho}(y)=\rho(y) \frac{1}{M(b-a)}$
3.4 Histogrames. mètode per estimar la densitat de probabilitat d'una v.a.
sigui un conjunt de $N$ nombres $\left\{x_{1}, x_{2} \ldots x_{N}\right\}$ generats independentment per $\rho(x) \longrightarrow$ HISTOGRAMA
3. Determinem el màxim $(x M)$ i el minim $\left(x_{m}\right)$ del conjunt
4. Construim una partició de e'interval $\left[x_{m}, x_{M}\right] \rightarrow z_{1}=x_{m}<z_{2}<\cdots<z_{N B+1}=x_{m}$

Amb NB intervals $\left(\leftrightarrow\right.$ barres de $e^{\prime}$ Histograula $) \longrightarrow \omega_{k}=z_{k+1}-z_{k}$ (auplada de l'interval $k$ )
3. Comptem el nombre de valors $x_{j}$ de cada subsinteroal Nk
4. Distribucio de probabilitat $\rightarrow P_{N}(x)=\sum_{k=1}^{N B} P_{k} W\left(x ; z_{k}, z_{k+1}\right) \quad$ amb $\quad P_{k}=\frac{N_{k}}{N W_{k}} \quad i \quad W=\left\{\begin{array}{lll}1 & \text { si } & x \in\left[x_{k}, x_{k+1}\right] \\ 0 & \text { si } & x \notin\left[x_{k}, x_{k+1}\right]\end{array}\right.$ propietat: $\int_{S} d x P_{N}(x)=1$
variància $\rightarrow \operatorname{Var}\left(p_{k}\right)=\frac{1}{w_{k}^{2} N^{2}} \operatorname{var}\left(N_{k}\right)=\frac{1}{\omega_{k}^{2} N^{2}} N \frac{N_{k}}{N}\left(1-\frac{N_{k}}{N}\right)$
desviacić estaudard $\rightarrow \sigma=\sqrt{\operatorname{Var}\left(p_{k}\right)}=\frac{1}{\omega_{k} \sqrt{N}} \sqrt{\frac{N_{k}}{N}\left(1-\frac{N_{k}}{N}\right)} \rightarrow$ En augmentar $N$ millora l'error com $\frac{1}{\sqrt{N}}$

### 3.5 TEOREMA DEL LÍMIT CENTRAL

sigui $x$ una v.A. distribuida segons $\rho(x)$, construim $z=\frac{x_{1}+x_{2}+\ldots x_{N}}{N}\left(x_{i}\right.$ són els $N$ resultats de $\left.x\right)$ De mamera que $z \equiv$ promig d'un grup de resultats d'una V.A.
segueix una gaussiana $\rightarrow g(z)=\frac{1}{\sqrt{2 \pi} \sigma} e^{\frac{-(\mu-z)^{2}}{2 \sigma^{2}}}$ amb $\sigma=\frac{\sigma_{x}}{\sqrt{N}}$ i $\langle z\rangle=\mu$

### 3.6 INTEGRALS DEFINIDES

## $\rightarrow$ MÈTODE D'ENCERT - ERROR

Calcul d'integrals de funcions positives i acotades, $[a, b]: \quad I=\int_{a}^{b} f(x) d x=\int_{a}^{b} d x \int_{0}^{M} d p \Theta(f(x)-p)$ Emprant el TLC: $\frac{I}{M(b-a)} \simeq \frac{\sum_{k=1}^{N} \Theta\left(f\left(x_{k}\right)-p_{k}\right)}{N}=\frac{N(\text { dins })}{N(\text { total })}$
![](https://cdn.mathpix.com/cropped/2025_08_29_1fa009b3b17812752d01g-08.jpg?height=229&width=229&top_left_y=2523&top_left_x=976)
(b-a) cops el promig de la funció $f(x)$ aut la V.A. $x$ distribuida aubl $U(0,1)$
$\rightarrow$ Mètode DE MONTECARLO CRU
$I=\int_{a}^{b} f(x) d x=\int_{0}^{1} h(t) d t \longrightarrow$ valor esperat de la funció $h(t)$ amb la variable $t$ distribuida segons $v(0,1)$
canvi de variable: $h(t)=(b-a) \cdot f((b-a) t+a)$

Emprant el TLC: $\int_{0}^{1} h(t) d t \simeq \frac{1}{N} \sum_{k=1}^{N} h\left(t_{k}\right)$
considerem una variable promig $H_{N}=\frac{1}{N} \sum_{k} h\left(t_{k}\right)$, que segons el TLC. si $N$ és prou gran, està distribuida com una gaussiana ${ }^{N}$ desv. estaindard: $\sigma_{H N}=\frac{\sigma_{h}}{\sqrt{N}}$ amb $\sigma_{h}=\sqrt{\left\langle h^{2}(t)\right\rangle-\langle h(t)\rangle^{2}}$
Per $N$ molt gran: $\int_{0}^{1} h^{2}(t) d t \simeq \frac{1}{N} \sum_{k=1}^{N} h^{2}\left(t_{k}\right) \longrightarrow$ desv. estàudard: $\sigma_{\text {Hn }} \simeq \frac{1}{\sqrt{N}} \sqrt{\frac{1}{N} \sum_{k} h^{2}\left(t_{k}\right)-\left(\frac{1}{N} \sum_{k} h\left(t_{k}\right)\right)^{2}}$
$\longrightarrow$ MÈTODE DE MONTECARLO AMB SAMPLEIG D'IMPORTÀNCIA
Per quan la funció a integrar està més localizada en alguna regió de l'interval.
si $f(x)$ conte una $g(x)>0$ que sigui distribució $\int_{S} g(x) d x=1$, emprem punts generats per aquesta distribució.

* distribució explícita:
considerem $\left.\begin{array}{rl}I=\int_{S} f(x) d x=\langle h(x)\rangle & \rightarrow I=\langle h(x)\rangle=\int_{S} h(x) g(x) d x \\ & \rightarrow f(x)=h(x) g(x)\end{array}\right\}$ aplicant el TLC: $I=\left\langle H_{N}\right\rangle \simeq \frac{1}{N} \sum_{k} g\left(x_{k}\right)$
aut $\left.\quad \begin{array}{rl} & \sigma_{h} \simeq \sqrt{\frac{1}{N} \sum_{k} h^{2}\left(x_{k}\right)-\left(\frac{1}{N} \sum_{k} h\left(x_{k}\right)\right)^{2}} \\ & \sigma_{H_{N}} \simeq \frac{1}{\sqrt{N}} \sqrt{\frac{1}{N} \sum_{k} h^{2}\left(x_{k}\right)-\left(\frac{1}{N} \sum_{k} h\left(x_{k}\right)\right)^{2}}\end{array}\right\}$

$$
I=\int_{S} f(x) d x \simeq \frac{1}{N} \sum_{k=1}^{N} h\left(x_{k}\right) \pm \frac{1}{\sqrt{N}} \sqrt{\frac{1}{N} \sum_{k} h^{2}\left(x_{k}\right)-\left(\frac{1}{N} \sum_{k} h\left(x_{k}\right)\right)^{2}}
$$

* cas generar.
considerem $I=\int_{S} f(x) d x=\int_{S} \frac{f(x)}{g(x)} g(x) d x \quad$ aub $\quad\left\{\begin{array}{l}\int_{S} g(x) d x=1 \\ g(x)>0\end{array}\right.$
Aplicant el TLC: I = $\int_{S} f(x) d x \simeq \frac{1}{N} \sum_{k=1}^{N} \frac{f\left(x_{k}\right)}{g\left(x_{k}\right)} \pm \frac{1}{\sqrt{N}} \sqrt{\frac{1}{N} \sum_{k=1}^{N} \frac{f^{2}\left(x_{k}\right)}{g^{2}\left(x_{k}\right)}-\left(\frac{1}{N} \sum_{k=1}^{N} \frac{f\left(x_{k}\right)}{g\left(x_{k}\right)}\right)^{2}}$


## $\rightarrow$ INTEGRALS MULTIDIMENSIONALS

1,203 dimensions $\rightarrow$ utilitzem mètodes de TRAPEZIS, SIMPSON 0 ROMBERG
40 més dimensions $\rightarrow$ utilizem el mètode de MONTECARLO (tot i que requereix de molts punts)
Montecarlo per $N$ dimensions: $I=\int d\{x\} h(\{x\})=\frac{1}{N} \sum_{k=1}^{N} h\left(x_{1}^{k} \cdots x_{m}^{k}\right) \pm \frac{1}{\sqrt{N}} \sqrt{\frac{1}{N} \sum_{k} h^{2}\left(x_{1}^{k} \cdots x_{m}^{k}\right)-\left(\frac{1}{N} \sum_{k} h\left(x_{1}^{k} \cdots x_{m}^{k}\right)\right)^{2}}$

### 3.7 GENERACIÓ DE NOMBRES ALEATORIS

sempre que generem nombres aleatoris utilizem distribucions ael tipus $v(0,1)$. La majoria de mètodes es basen en relacions denominades congruencials.
generen seqüencies de nombres aub fórmules com $N_{i}=\bmod \left[\left(a N_{i-1}+b\right), M\right]$
on els nombres que busquem són $x_{i}=\frac{N_{i}}{M}$
Perquè aquesles seqüències funcionin correctament ens haurien de donar nombres descorrelacionats i uniformement distribuits. Aquests mètodes tenen un periode que varia auf $M$.

## 4. Equacions diferencials ordinàries

considerem que coneixem el valor de les variables en un temps inicial to $i$ en volem conèixer el valor en temps successius.

### 4.1 ALGORISMES D'INTEGRACIÓ PER EDOS

considerem $\frac{d y}{d x}=f(x, y)$ (cas general) auf condicions inicials $\longrightarrow y(x=0)=y_{0}$
construirem una discretizació de la variable $x \rightarrow h \equiv \Delta x$ tal que trobarem el valor de $y(x+k \Delta x)$
la part dreta de l'equació $(f(x, y))$ és taulé coneguda.
$\rightarrow$ MÈTODE D'EULER
Donada la variable $x \rightarrow x_{n}=x_{0}+n h$ i la notació $\left\{\begin{array}{l}y_{n} \equiv y\left(x_{n}\right) \\ f_{n} \equiv f\left(x_{n}, y_{n}\right)\end{array}\right.$
fórmula avançada per la derivada $\rightarrow \frac{y_{n+1}-y_{n}}{h}+\theta(h) \simeq f_{n} \rightarrow y_{n+1}=y_{n}+h f_{n}+\theta\left(h^{2}\right)$

Per millorar l'error fem servir 2 punts $i$ en trobem un tercer:

$$
\left.\begin{array}{l}
\rightarrow y(x+h)=y(x)+h y^{\prime}(x)+\frac{h^{2}}{2} y^{\prime \prime}(x)+\theta\left(h^{3}\right) \\
\rightarrow y(x-h)=y(x)-h y^{\prime}(x)+\frac{h^{2}}{2} y^{\prime \prime}(x)+\theta\left(h^{3}\right)
\end{array}\right\} y(x+h)-y(x-h)=2 h y^{\prime}(x)+\theta\left(h^{3}\right) \longrightarrow y_{n+1}=y_{n-1}+2 h f n+\theta\left(h^{3}\right)
$$

## $\rightarrow$ Mètodes IMPLÍCITS

Podem calcular $\frac{d y}{d x}=f(x, y)$ pels mètodes d'integració estudiats. com el mètode dels trapezis:
$\int_{x_{0}}^{x_{1}} \frac{d y}{d x} d x=y\left(x_{1}\right)-y\left(x_{2}\right) \simeq \frac{h}{2}\left[f\left(x_{0}, y_{0}\right)+f\left(x_{1}, y_{1}\right)\right]+\theta\left(h^{3}\right) \longrightarrow y_{1}-y_{0}-\frac{h}{2}\left(f\left(x_{0}, y_{0}\right)+f\left(x_{1}, y_{1}\right)\right)=0$
$\rightarrow$ MÉTODE PREDICTOR - CORRECTOR
Combina un mètode explícit (p.ex. Euler) com a predictor i un mètode implícit (p.ex. trapezis) com a corrector. tal que el terme implícit es substituit per la predicció del primer, és a dir:

$$
y_{1}^{\text {pred }}=y_{0}+h f\left(x_{0}, y_{0}\right) \longrightarrow y_{1}=y_{0}+\frac{h}{2}\left(f\left(x_{0}, y_{0}\right)+f\left(x_{1}, y_{1}^{\text {pred }}\right)\right)
$$

### 4.2 MÉTODES MULTIPAS

Calculem diferents punts de la funció i, a partir d'aquests, definim el següent oalor. La idea és utilizar valors de $y^{\prime} y^{\prime}$ auteriors per construir un polinomi que s'aproximi a $y^{\prime} i$ integrar $l^{\prime}$ eq. diferencial.

* Mètode Adaus $\int_{x_{n}}^{x_{n+1}} y^{\prime}(x) d x=y_{n+1}-y_{n}=\int_{x_{n}}^{x n+1} f(x, y) d x \longrightarrow y_{n+1}=y_{n}+\frac{h}{12}\left(23 f_{n}-16 f_{n-1}+5 f_{n+2}\right)+\theta\left(h^{4}\right)$
utilitzant 4 passos: $y_{n+1}=y_{n} \frac{h}{24}\left(55 f_{n}-59 f_{n-1}+37 f_{n-2}-9 f_{n-3}\right)+\theta\left(h^{5}\right)$
* Mètode Adaus - Moulton predictor : $y_{n+1}^{P}=y_{n}+\frac{h}{24}\left(55 f_{n}-59(n-1-37(n-2-9 f n-3)\right.$
(predictor - corrector)
corrector: $y_{n+1}=y_{n}+\frac{h}{24}\left(9 f_{n+1}^{p}+19 f_{n}-5 f_{n-1}+f n-2\right)-\frac{19}{720} h^{5} f^{v}(\xi)$
* Mètode de Hamming predictor: $y_{n+1}^{p}=y_{n-3}+\frac{4 h}{3}\left(2 f_{n}-f_{n-1}+2 f_{n-2}\right)$
(predictor-corrector)
modificador: $y_{n+1}^{m}=y_{n+1}^{P}-\frac{112}{121}\left(y_{n}^{P}-y_{n}^{c}\right)$
corrector: $y_{n+1}^{c}=\frac{1}{8}\left(9 y_{n}-y_{n-2}+3 h\left(f_{n+1}^{m}+2 f_{n}-f_{n-1}\right)\right)$
valor final: $y_{n+1}=y_{n+1}^{c}+\frac{9}{121}\left(y_{n+1}^{p}-y_{n+1}^{c}\right) \longrightarrow$ Error global $\theta\left(h^{6}\right)$


### 4.3 MÈTODES D'ORDRE SUPERIOR. RUNGE-KUTTA

són mètodes multipas que busquen una aproximació d'ordre superior local a la funció $y\left(x_{0}+h\right)$ :

$$
y\left(x_{0}+h\right)=y\left(x_{0}\right)+h y^{\prime}\left(x_{0}\right)+\frac{h^{2}}{2} y^{\prime \prime}\left(x_{0}\right)+\ldots \rightarrow \text { substituim la } E D 0: y\left(x_{0}+h\right)=y\left(x_{0}\right)+h f\left(x_{0}, y_{0}\right)+\frac{h^{2}}{2} y^{\prime \prime}\left(x_{0}\right)+\ldots
$$

Per trobar aproximacions de $y^{\prime \prime}\left(x_{0}\right)$ cal desenvolupar $f(x, y)$ aproximant-ne les derivades.

## $\rightarrow$ MÈTODES DE RUNGE-KUTTA

Empra $R$ evaluacions de la funció $f(x, y)$ (derivada de la solució $y(x)$ en diversas punts) i en fa una mitjaua ponderada.

$$
\text { * ordre } 4\left(R k_{4}\right): y_{1}=y_{0}+\frac{h}{6}\left(k_{1}+2 k_{2}+2 k_{3}+k_{4}\right) \text { aut }\left\{\begin{array}{l}
k_{1}=f\left(x_{0}, y_{0}\right) \\
k_{2}=f\left(x_{0}+\frac{h}{2}, y_{0}+\frac{h}{2} k_{1}\right) \\
k_{3}=f\left(x_{0}+\frac{h}{2}, y_{0}+\frac{h}{2} k_{2}\right) \\
k_{4}=f\left(x_{0}+h, y_{0}+h k_{3}\right)
\end{array}\right.
$$

EDOS de $2 n$ ordre que donen $\| 0 c$ a problemes de dos punts $\frac{d^{2} y}{d x^{2}}=f\left(x, y, \frac{d y}{d x}\right)$ aub les condicions de contorn repartides en dos punts diferents $(a ; b) \longrightarrow p . e x$.

$$
\begin{aligned}
& y(x=a)=x a \\
& y(x=b)=x b
\end{aligned}
$$

## $\rightarrow$ MÊTODE DE TIR

Tenim $\frac{d^{2} y}{d x^{2}}=f\left(x, y, \frac{d y}{d x}\right)$ amb $\left\{\begin{array}{l}y(x=a)=y a \\ y(x=b)=y b\end{array}\right.$ i volem salver quan val $y^{\prime}(a)$

Fem tirs de $y^{\prime}(a) \longrightarrow$ proposem un valor de $y^{\prime}(a)$ i mirem quina $y(b)$ obtenim a partir d'un dels mètodes d'obtenció d'arrels (tema 1) fins obtenir $y(b)=y_{b}$ (aproximació)
si $y(b)>y_{b} \longrightarrow$ agafem una $y^{\prime}(a)$ més petita
si $y(b)<y b \longrightarrow$ agafem una $y^{\prime}(a)$ més gran

## 5. Equacions diferencials en derivades parcials

5.1 CLASSIFICACIÓ DE lES EDPS
considerem $\varnothing$ dependent de $x$ it $\rightarrow \frac{\partial^{2} \phi}{\partial x^{2}}, \frac{\partial^{2} \phi}{\partial t^{2}}, \frac{\partial^{2} \phi}{\partial x \partial t}=\frac{\partial^{2} \phi}{\partial t \partial x} \rightarrow$ eq. general $A \frac{\partial^{2} \phi}{\partial t^{2}}+B \frac{\partial^{2} \phi}{\partial t \partial x}+C \frac{\partial^{2} \phi}{\partial x^{2}}+D\left(x, t, \frac{\partial \phi}{\partial x}, \frac{\partial \phi}{\partial t}\right)=0$
Donat $\Delta=B^{2}-4 A C$ es classifiquen com:

* elíptiques ( $\Delta<0$ )

1 laplace: $\quad \nabla^{2} f(x, y, z)=0 \quad \longrightarrow \frac{\partial^{2} f(x, y, z)}{\partial x^{2}}+\frac{\partial^{2} f(x, y, z)}{\partial y^{2}}=0$
2Poisson: $\quad \nabla^{2} f(x, y)=-\varphi(x, y)$
3 Schrödinger estacionäria: $-\frac{\hbar^{2}}{2 m}\left(\frac{\partial^{2} \Psi}{\partial x^{2}}+\frac{\partial^{2} \Psi}{\partial y^{2}}\right)+v \Psi=E \Psi$
Per aquests casos $\begin{cases}B=0 & \text { no derivades creuades } \\ A C>0 & \text { derivades parcials aub } \\ & \text { el mateix signe }\end{cases}$

* Parabóliques $(\Delta=0)$

1 difusió: $\frac{\partial \phi}{\partial t}=-k \frac{\partial 2 \phi}{\partial x^{2}}$
${ }^{2}$ Schrödinger dependent del temps: $-\frac{\hbar^{2}}{2 m} \frac{\partial^{2} \Psi}{\partial x^{2}}+v \Psi=i \hbar \frac{\partial \Psi}{\partial t}$ Per aquests casos $\begin{cases}B=0 & \text { no derivades creuades } \\ A=0 & \text { derivada temporal ordre 1 }\end{cases}$

* HIPERBÒLIQUES ( $\Delta>0$ )

1 ones de 1D: $\frac{\partial^{2} \phi}{\partial t^{2}}-c^{2} \frac{\partial^{28}}{\partial x^{2}}=0$
2 ones aub atenuació: $\frac{\partial^{2} \mathscr{C}}{\partial t^{2}}-\lambda \frac{\partial \mathscr{Q}}{\partial t}-C^{2} \frac{\partial^{2} \mathscr{Q}}{\partial x^{2}}=f(x, t)$
Per aquests casos $\begin{cases}B=0 & \text { no derivades creuades } \\ A C<0 & \text { derivades parcials aub } \\ & \text { signes contraris }\end{cases}$
$\longrightarrow$ CONDICIONS INICIALS I DE CONTORN

* condicions de Dirichlet s'imposa que la solució tingui un valor determinat en un contorn tancat (linia 2D, superficie 3D, ...)
* condicions de neumann s'imposa que es conegui el valor de la derivada de la solucio en la direcció normal a la superficie en un contorn donat.
5.2 MÉTODES DE PAS FINIT

Utilizem aproximacions de pas finit per les derivades $\longrightarrow$ EDP $\rightarrow$ EDOS discretizant les varialles.
Der funcions sufficientment regulars:

$$
\left.\begin{array}{l}
f(x+h)=f(x)+h f^{\prime}(x)+\frac{h^{2}}{2} f^{\prime \prime}(x)+\frac{h^{3}}{3!} f^{\prime \prime \prime}(x)+\theta\left(h^{4}\right) \\
f(x-h)=f(x)-h f^{\prime}(x)+\frac{h^{2}}{2} f^{\prime \prime}(x)-\frac{h^{3}}{3!} f^{\prime \prime \prime}(x)+\theta\left(h^{4}\right)
\end{array}\right\} \longrightarrow \begin{aligned}
& \left.f^{\prime}(x)=\frac{f(x+h)-f(x-h)}{2 h}+\theta\left(h^{2}\right) \longrightarrow \operatorname{definim}: \begin{array}{l}
x=n h \\
f(x) \equiv f_{n} \\
f(x+h) \equiv f_{n+1}
\end{array}\right\} \frac{f_{n}^{\prime} \simeq \frac{f_{n+1}-f_{n-1}}{2 h}}{2 h} \\
& f_{n}^{\prime \prime}=\frac{f_{n+1}-2 f_{n}+f_{n-1}}{h^{2}}+\theta\left(h^{2}\right)
\end{aligned}
$$

$\longrightarrow$ EQUACIÓ DE LADLACE $\frac{\partial^{2}}{\partial x^{2}} \varnothing(x, y)+\frac{\partial^{2}}{\partial y^{2}} \varnothing(x, y)=0$
Utilitzarem una malla de pas constant i igual per les dues coordenades: $\begin{cases}x=i h & a m b \quad i=0,1, \ldots N_{x} \\ y=j h & a m b \quad j=0,1, \ldots N_{y}\end{cases}$ Definim $\quad \varnothing(x, y)=\varnothing(i h, j h)=\ell_{i, j} \longrightarrow$ MATRIU $N x \times N y$

Tindrem :
$\rightarrow$ direcció $\left.x: \frac{\partial \varnothing}{\partial x} \simeq \frac{\varnothing_{i+1, j}-\varnothing_{i-1, j}}{2 h} ; \frac{\partial 2 \varnothing}{\partial x^{2}} \simeq \frac{\varnothing_{i+1, j}+\varnothing_{i-1, j}-2 \varnothing_{i j}}{h^{2}}\right\} \varnothing_{i+1, j}+\varnothing_{i-1, j}+\varnothing_{i, j+1}+\varnothing_{i, j-1}-4 \varnothing_{i j}=0$
$\rightarrow$ direcció $y: \frac{\partial \phi}{\partial y} \simeq \frac{\phi_{i, j+1}-\phi_{i, j-1}}{2 h}: \frac{\partial^{2} \mathscr{C}}{\partial y^{2}} \simeq \frac{\phi_{i, j+1}+\phi_{i, j-1}-2 \phi_{i j}}{h^{2}}$

* condicions de Dirichlet

Alguns termes de l'equació són coneguts, tal que tindrem un conjunt de $\left(N_{x}-1\right)\left(N_{y}-1\right)$ equacions $i$ incògnites

* Condicions de Neumann
exemple: gradient en $x=0:\left.\frac{\partial \varnothing}{\partial x}\right|_{x=0}=\beta \quad$ (recta $x=0$ )
Per imposar aquesta condició cal afegir punts auxiliars $\varnothing-a, j$ tal que $\varnothing_{0, j}$ seran interiors. Tindrem $\left(N_{x}-1\right)$ incognites noves amb equació per resoldre.
Emprant $f_{n}^{\prime} \simeq \frac{f n+1-f n-1}{2 h}+\theta\left(n^{2}\right) \longrightarrow$ c.c. $\varnothing_{-1, j}=\varnothing_{1, j}+2 h \beta$
$\rightarrow$ RESOLUCIÓ DEL SISTEMA D'EQUACIONS RESULTANT
Donada e' eq. de Laplace discreta $\varnothing_{i j}=\frac{\varnothing_{i+1, j}+\varnothing_{i-1, j}+\varnothing_{i, j+1}+\varnothing_{i, j-1}}{4}$, la resolem seguint la següent estructura:

1. Inicialitzem $\varnothing_{i, j}$ auf valors aleatoris $i$ en el contorn utilitzem les condicions de Dirichlet
2. comencem a citerar (mètode Jacobi, Gauss-Seidel o sobre-relaxació) recorrent tots els nodes
3. Avaluem l'error $\rightarrow E_{r r}=\operatorname{Max}\left[\left|\phi_{i, j}^{k+1}-\phi_{i, j}^{k}\right|\right] \quad \forall i, j \quad$ aub $k \equiv i t e r a c i o n s$
4. si l'error és menor que la toleräncia, aturem, si no, tornem a 2 .

* Mètode de Jacobi $\rightarrow \Phi_{i, j}^{k+1}=\frac{\varnothing_{i+1, j}^{k}+\varnothing_{i-1, j}^{k}+\varnothing_{i, j+1}^{k}+\varnothing_{i, j-1}^{k}}{4}$
* Mètode de Gauss-Seidel $\rightarrow \phi_{i, j}^{k+1}=\frac{\phi_{i+1, j}^{k}+\phi_{i-1, j}^{k+1}+\phi_{i, j+1}^{k}+\phi_{i, j-1}^{k+1}}{4}$
* Mètode de Sobre-Relaxació $\rightarrow \varnothing_{i, j}^{k+1}=\varnothing_{i, j}^{k}+\omega \frac{\varnothing_{i+1, j}^{k}+\varnothing_{i-1, j}^{k+1}+\varnothing_{i, j+1}^{k}+\varnothing_{i, j-1}^{k+1}-4 \varnothing_{i, j}}{4} \quad$ amb $\quad \omega>1$ (valors òptims we[1,2])
$\rightarrow$ EQUACIÓ DE DOISSON I METTODES D'ORDRE SUPERIOR
Donada l'eq. de Poisson $\nabla^{2} \varnothing(x, y)=-\rho(x, y)$, apliquem el mateix procediment amb algorismes iteratius, ara amb :

$$
\varnothing_{i, j}=\frac{\varnothing_{i+1, j}+\varnothing_{i-1, j}+\varnothing_{i, j+1}+\varnothing_{i, j-1}+h^{2} e_{i j}}{4}
$$

I. per ordre superior tenim: $\varnothing_{i j}=\frac{\varnothing_{i+1, j+1}+\varnothing_{i-1, j+1}+\varnothing_{i+1, j-1}+\varnothing_{i-1, j-1}+4 \varnothing_{i, j+1}+4 \varnothing_{i, j-1}+4 \varnothing_{i+1, j}+4 \varnothing_{i-1, j}}{20}$
5.4 Equacions Parabòliques

A diferència dels mètodes auteriors $\left\{\begin{array}{l}\text { EDOS } \rightarrow \text { vectors de derivades } \\ \text { EDDD hiperbòliques } \rightarrow \text { malla }\end{array} \quad\right.$ Ara iterarem en matrius tridiagonals.
Primer de tot, cal discretizar les derivades parcials $\rightarrow$ emprar fórmula a 2 punts per $f^{\prime}(x, t)$ i a 3 punts per $f^{\prime \prime}(x, t)$ :
$\left.\begin{array}{l}\rightarrow \frac{\partial^{2} u}{\partial x^{2}}=\frac{u\left(x_{i+1}, t_{j}\right)-2 u\left(x_{i}, t_{j}\right)+u\left(x_{i-1}, t_{j}\right)}{h^{2}}+\theta\left(h^{2}\right) \rightarrow \text { central } \\ \rightarrow \frac{\partial u}{\partial t}=\frac{u\left(x_{i}, t_{j+1}\right)-u\left(x_{i}, t_{j}\right)}{\Delta t}+\theta(\Delta t) \rightarrow \text { ascendent }\end{array}\right\}$ NOTACió: $u_{i j}=u\left(x_{i}, t_{j}\right)$ i $h=\Delta x$

Aleshores, assignem condicions:

* Inicials: temperatura a tots els punts per $t=0 \rightarrow u(x, t=0)=f(x)$
* De contorn temperatura als extrems (constants) $\rightarrow u(0, t)=C_{1}$ i $u(L, t)=C_{2}$

I, a partir d'aquí, podem emprar els mètodes explícit o implícit per resoldre-ho
$\rightarrow$ MÈTODE EXPLÍCIT
Substituint les derivades discretitiades a e'equació de la calor definint un paràmetre adimensional ( $r$ ) que ajudarà a la convergència del mètode, obtenim una expressió general per $u_{i}^{j+1}$ (evolució temporal) en funció dels punts que e'enoolten $u_{i+1}^{j}, u_{i}^{j}, u_{i-1}^{j}$ (temps actual). Aquest mètode és força inestable.
$\rightarrow$ MÈTODE IMPLICIT (CRANK - NICOLSON)
Per millorar l'estabilitat, prenem un pas de $m=\frac{\Delta t}{2}$ i una derivada $\frac{\partial u}{\partial t}$ aub diferència central, per tant:

$$
\begin{aligned}
& \left.\rightarrow \frac{\partial u}{\partial t}\right|_{\substack{x=x \\
t=x_{i}+1}}=\frac{u_{i}^{j+1}-u_{i}^{j}}{2 \cdot \frac{\Delta t}{2}}-\theta\left(\left(\frac{\Delta t}{2}\right)^{2}\right) \\
& \left.\rightarrow \frac{\partial^{2} u}{\partial x^{2}}\right|_{\substack{x=x \\
t=x_{i}+1}}=\frac{1}{2}\left(\frac{u_{i+1}^{j}-2 u_{i} j+u_{i}^{j} j_{1}}{(\Delta x)^{2}}+\frac{u_{i+1}^{j+1}-2 u_{i}^{j+1}+u_{i}^{j+1}}{(\Delta x)^{2}}\right)+\theta\left((\Delta x)^{2}\right)
\end{aligned}
$$

![](https://cdn.mathpix.com/cropped/2025_08_29_1fe80eed909d5e075210g-3.jpg?height=75&width=238&top_left_y=556&top_left_x=1290)
substituint a éequació de la calor obtenim una expressió de $u_{i}^{j+1}, u_{i+1}^{j+1}$ i $u_{i-1}^{j+1}$ en relació a $u_{i}^{j}, u_{i+1}^{j}, u_{i-1}^{d}$.
Per taut, es millora l'error ( $h^{2}$ ) peró cal resoldre el sistema d' eq. lineal (matriu tridiagonal).



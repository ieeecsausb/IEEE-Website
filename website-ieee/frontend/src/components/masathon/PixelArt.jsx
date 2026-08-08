/* ============================================================
   MASATHON — hand-authored pixel-art sprite library.
   Every sprite is a character grid rendered as crisp SVG rects,
   so it scales infinitely without ever going blurry.
   ============================================================ */

export const PAL = {
    '.': null,
    K: '#000000', // outline
    R: '#e52521', // mario red
    S: '#fbc28c', // skin
    B: '#0b6ed8', // overalls blue
    H: '#7c3f00', // hair / shoes
    Y: '#fbd000', // gold
    y: '#c08000', // dark gold
    W: '#ffffff',
    G: '#43b047', // green
    g: '#1e7a1e',
    N: '#c4661f', // goomba body
    n: '#8a3f0b', // goomba top
    O: '#ff8c00', // orange
    T: '#e39d57', // block tan
    t: '#b06a22', // block tan dark
    M: '#7a4a18', // used-block dark
    m: '#a0651f', // used-block fill
    P: '#c85422', // brick
    p: '#8f3312', // brick shade
};

/* -------------------------------------------------- renderer */
export function PixelSprite({ map, palette = PAL, flip = false, className = '', style, title }) {
    const h = map.length;
    const w = map[0].length;
    const rects = [];
    for (let y = 0; y < h; y++) {
        const row = map[y];
        let x = 0;
        while (x < w) {
            const c = row[x];
            const fill = palette[c];
            if (!fill) {
                x++;
                continue;
            }
            let len = 1;
            while (x + len < w && row[x + len] === c) len++;
            rects.push(<rect key={`${y}_${x}`} x={x} y={y} width={len} height={1} fill={fill} />);
            x += len;
        }
    }
    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            shapeRendering="crispEdges"
            className={className}
            style={{ ...style, transform: flip ? `scaleX(-1) ${style?.transform || ''}` : style?.transform }}
            aria-hidden={title ? undefined : 'true'}
            role={title ? 'img' : undefined}
        >
            {title ? <title>{title}</title> : null}
            {rects}
        </svg>
    );
}

/* -------------------------------------------------- MARIO (12 x 16) */
const MARIO_HEAD = [
    '....RRRRR...',
    '...RRRRRRRRR',
    '...HHHSSKS..',
    '..HSHSSSKSSS',
    '..HSHHSSSKSS',
    '..HHSSSSSSS.',
    '....SSSSSS..',
];

export const MARIO_STAND = [
    ...MARIO_HEAD,
    '...RRBRRR...',
    '..RRRBRRBRR.',
    '.RRRRBBBBRRR',
    'SSRBYBBYBRSS',
    'SSSBBBBBBSSS',
    '.SBBBBBBBBS.',
    '...BBB.BBB..',
    '..HHH...HHH.',
    '.HHHH...HHHH',
];

export const MARIO_RUN1 = [
    ...MARIO_HEAD,
    '..RRRBBBRRR.',
    '.RRRRBBBRRRR',
    'SSRRRBBBRRRS',
    'SSRRBBBBBRRS',
    '..SSBBBBBSS.',
    '...BBBBBBB..',
    '..HHHH.BBB..',
    '.HHHHH..HHH.',
    '.HHH...HHHHH',
];

export const MARIO_RUN2 = [
    ...MARIO_HEAD,
    '...RRBBBRR..',
    '..RRRBBBRRR.',
    '.SRRRBBBRRRS',
    '.SSRBBBBBRSS',
    '...BBBBBBB..',
    '...BBBBBBB..',
    '...BBB.BBB..',
    '..HHHH.HHHH.',
    '.HHHHH.HHHHH',
];

export const MARIO_RUN3 = [
    ...MARIO_HEAD,
    '.RRRBBBRRR..',
    'RRRRBBBRRRR.',
    'SRRRBBBRRRSS',
    'SRRBBBBBRRSS',
    '.SSBBBBBSS..',
    '..BBBBBBB...',
    '..BBB.HHHH..',
    '.HHH..HHHHH.',
    'HHHHH...HHH.',
];

export const MARIO_JUMP = [
    ...MARIO_HEAD.slice(0, 6),
    'SS..SSSSSS.S',
    'SSRRRBBBRRSS',
    '.SRRRBBBRRS.',
    '..RRRBBBRRR.',
    '..RRBBBBBRR.',
    '...BBBBBBB..',
    '...BBB.BBB..',
    '..HHH...HHH.',
    '.HHHH...HHHH',
    '.HHH.....HHH',
];

export const MARIO_RUN_CYCLE = [MARIO_RUN1, MARIO_RUN2, MARIO_RUN3, MARIO_RUN2];

/* -------------------------------------------------- GOOMBA (16 x 16) */
export const GOOMBA = [
    '....KKKKKKKK....',
    '..KKnnnnnnnnKK..',
    '.KnnnnnnnnnnnnK.',
    '.KnnnnnnnnnnnnK.',
    'KnnWWKnnnnKWWnnK',
    'KnnWWKnnnnKWWnnK',
    'KnnnnKnnnnKnnnnK',
    'KnnnnnnnnnnnnnnK',
    'KNNNNNNNNNNNNNNK',
    'KNNNNNNNNNNNNNNK',
    '.KNNNNNNNNNNNNK.',
    '..KKNNNNNNNNKK..',
    '...KKKKKKKKKK...',
    '..KKWWKKKKWWKK..',
    '.KKWWWKKKKWWWKK.',
    '..KKKK....KKKK..',
];

/* -------------------------------------------------- COIN (8 x 10) */
export const COIN = [
    '..yYYy..',
    '.yYYYYy.',
    'yYYyyYYy',
    'yYYyyYYy',
    'yYYyyYYy',
    'yYYyyYYy',
    'yYYyyYYy',
    'yYYyyYYy',
    '.yYYYYy.',
    '..yYYy..',
];

/* -------------------------------------------------- MUSHROOM (16 x 16) */
export const MUSHROOM = [
    '....KKKKKKKK....',
    '..KKWWWWWWWWKK..',
    '.KWWWWRRRRWWWWK.',
    '.KWWRRRRRRRRWWK.',
    'KWWRRRWWWWRRRWWK',
    'KWRRRWWWWWWRRRWK',
    'KRRRWWWWWWWWRRRK',
    'KRRWWWWWWWWWWRRK',
    'KRRWWWWWWWWWWRRK',
    'KRRRWWWWWWWWRRRK',
    '.KRRRRRRRRRRRRK.',
    '..KKSSSSSSSSKK..',
    '.KSSKSSSSSSKSSK.',
    'KSSSKSSSSSSKSSSK',
    'KSSSSSSSSSSSSSSK',
    '.KKKKKKKKKKKKKK.',
];

/* -------------------------------------------------- 1-UP MUSHROOM (green) */
export const ONEUP = MUSHROOM.map((r) => r.replace(/R/g, 'G'));

/* -------------------------------------------------- STAR (16 x 16) */
export const STAR = [
    '.......KK.......',
    '......KYYK......',
    '......KYYK......',
    '.....KYYYYK.....',
    'KKKKKKYYYYKKKKKK',
    'KYYYYYYYYYYYYYYK',
    '.YYYKKYYYYKKYYY.',
    '.YYYKKYYYYKKYYY.',
    '.YYYYYYYYYYYYYY.',
    '..YYYYYYYYYYYY..',
    '...YYYYYYYYYY...',
    '..YYYYYYYYYYYY..',
    '..YYYY.YY.YYYY..',
    '.YYYY..YY..YYYY.',
    '.YYY...KK...YYY.',
    '.KK.........KK..',
];

/* -------------------------------------------------- FIRE FLOWER (16 x 16) */
export const FLOWER = [
    '....KKKKKKKK....',
    '..KKWWWWWWWWKK..',
    '.KWWOOOOOOOOWWK.',
    '.KWOOOOOOOOOOWK.',
    'KWOOKKOOOOKKOOWK',
    'KWOOKKOOOOKKOOWK',
    'KWOOOOOOOOOOOOWK',
    '.KWOOOOOOOOOOWK.',
    '..KKWWWWWWWWKK..',
    '.....KGGGGK.....',
    '....KGGGGGGK....',
    '...KGGKKKKGGK...',
    '..KGGKGGGGKGGK..',
    '..KGKGGGGGGKGK..',
    '...KKGGGGGGKK...',
    '.....KKKKKK.....',
];

/* -------------------------------------------------- ? BLOCK (16 x 16) */
export const QBLOCK = [
    'KKKKKKKKKKKKKKKK',
    'KTTTTTTTTTTTTTTK',
    'KTKKTTTTTTTTKKTK',
    'KTTTTTKKKKTTTTTK',
    'KTTTTKKTTKKTTTTK',
    'KTTTTKKTTKKTTTTK',
    'KTTTTTTTTKKTTTTK',
    'KTTTTTTKKKTTTTTK',
    'KTTTTTTKKTTTTTTK',
    'KTTTTTTKKTTTTTTK',
    'KTTTTTTTTTTTTTTK',
    'KTTTTTTKKTTTTTTK',
    'KTTTTTTTTTTTTTTK',
    'KTKKTTTTTTTTKKTK',
    'KTTTTTTTTTTTTTTK',
    'KKKKKKKKKKKKKKKK',
];

/* -------------------------------------------------- USED BLOCK (16 x 16) */
export const USEDBLOCK = [
    'KKKKKKKKKKKKKKKK',
    'KMMMMMMMMMMMMMMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMmmmmmmmmmmmmMK',
    'KMMMMMMMMMMMMMMK',
    'KKKKKKKKKKKKKKKK',
];

/* -------------------------------------------------- BRICK (16 x 16) */
export const BRICK = [
    'KKKKKKKKKKKKKKKK',
    'PPPPPPPKPPPPPPPP',
    'PPPPPPPKPPPPPPPP',
    'pppppppppppppppp',
    'KKKKKKKKKKKKKKKK',
    'PPPKPPPPPPPPKPPP',
    'PPPKPPPPPPPPKPPP',
    'pppppppppppppppp',
    'KKKKKKKKKKKKKKKK',
    'PPPPPPPKPPPPPPPP',
    'PPPPPPPKPPPPPPPP',
    'pppppppppppppppp',
    'KKKKKKKKKKKKKKKK',
    'PPPKPPPPPPPPKPPP',
    'PPPKPPPPPPPPKPPP',
    'pppppppppppppppp',
];

/* -------------------------------------------------- tileable data-URI
   For large repeated areas (the prize podium) a single CSS background tile
   is far cheaper than thousands of individual <rect> nodes. */
export function spriteToDataUrl(map, palette = PAL) {
    const h = map.length;
    const w = map[0].length;
    let body = '';
    for (let y = 0; y < h; y++) {
        const row = map[y];
        let x = 0;
        while (x < w) {
            const c = row[x];
            const fill = palette[c];
            if (!fill) {
                x++;
                continue;
            }
            let len = 1;
            while (x + len < w && row[x + len] === c) len++;
            body += `<rect x="${x}" y="${y}" width="${len}" height="1" fill="${fill}"/>`;
            x += len;
        }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${body}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export const BRICK_TILE = spriteToDataUrl(BRICK);

/* -------------------------------------------------- SCENERY (parametric SVG) */

export function PixelCloud({ width = 130, className = '', style }) {
    return (
        <svg viewBox="0 0 30 14" width={width} shapeRendering="crispEdges" className={className} style={style} aria-hidden="true">
            <rect x="0" y="8" width="30" height="5" fill="#1a4fae" />
            <rect x="3" y="5" width="9" height="5" fill="#1a4fae" />
            <rect x="9" y="2" width="11" height="6" fill="#1a4fae" />
            <rect x="18" y="5" width="9" height="5" fill="#1a4fae" />
            <rect x="1" y="9" width="28" height="3" fill="#ffffff" />
            <rect x="4" y="6" width="7" height="5" fill="#ffffff" />
            <rect x="10" y="3" width="9" height="7" fill="#ffffff" />
            <rect x="19" y="6" width="7" height="5" fill="#ffffff" />
        </svg>
    );
}

export function PixelHill({ width = 260, dark = false, className = '', style }) {
    const fill = dark ? '#1e7a1e' : '#43b047';
    const shade = dark ? '#0b5c14' : '#1e7a1e';
    return (
        <svg viewBox="0 0 40 20" width={width} shapeRendering="crispEdges" className={className} style={style} aria-hidden="true">
            <rect x="0" y="16" width="40" height="4" fill={fill} />
            <rect x="4" y="12" width="32" height="4" fill={fill} />
            <rect x="10" y="8" width="20" height="4" fill={fill} />
            <rect x="16" y="4" width="8" height="4" fill={fill} />
            <rect x="18" y="1" width="4" height="3" fill={fill} />
            <rect x="12" y="12" width="2" height="2" fill={shade} />
            <rect x="14" y="14" width="2" height="2" fill={shade} />
            <rect x="24" y="12" width="2" height="2" fill={shade} />
            <rect x="22" y="14" width="2" height="2" fill={shade} />
            <rect x="18" y="10" width="4" height="2" fill={shade} />
        </svg>
    );
}

export function PixelBush({ width = 160, className = '', style }) {
    return (
        <svg viewBox="0 0 30 12" width={width} shapeRendering="crispEdges" className={className} style={style} aria-hidden="true">
            <rect x="0" y="7" width="30" height="5" fill="#1e7a1e" />
            <rect x="3" y="4" width="9" height="4" fill="#1e7a1e" />
            <rect x="10" y="1" width="11" height="6" fill="#1e7a1e" />
            <rect x="18" y="4" width="9" height="4" fill="#1e7a1e" />
            <rect x="1" y="8" width="28" height="3" fill="#43b047" />
            <rect x="4" y="5" width="7" height="4" fill="#43b047" />
            <rect x="11" y="2" width="9" height="6" fill="#43b047" />
            <rect x="19" y="5" width="7" height="4" fill="#43b047" />
        </svg>
    );
}

/** Classic warp pipe. `height` is the body length in px. */
export function PixelPipe({ width = 120, height = 130, className = '', style, glow = false }) {
    const bodyH = Math.max(6, Math.round((height / width) * 22) - 6);
    const total = 6 + bodyH;
    return (
        <svg
            viewBox={`0 0 26 ${total}`}
            width={width}
            shapeRendering="crispEdges"
            className={className}
            style={{ filter: glow ? 'drop-shadow(0 0 10px rgba(67,176,71,0.9))' : undefined, ...style }}
            aria-hidden="true"
        >
            {/* rim */}
            <rect x="0" y="0" width="26" height="6" fill="#000" />
            <rect x="1" y="1" width="24" height="4" fill="#43b047" />
            <rect x="2" y="1" width="3" height="4" fill="#8fe08f" />
            <rect x="20" y="1" width="4" height="4" fill="#0b5c14" />
            <rect x="1" y="1" width="24" height="1" fill="#0b5c14" />
            {/* body */}
            <rect x="3" y="6" width="20" height={bodyH} fill="#000" />
            <rect x="4" y="6" width="18" height={bodyH} fill="#43b047" />
            <rect x="5" y="6" width="3" height={bodyH} fill="#8fe08f" />
            <rect x="18" y="6" width="4" height={bodyH} fill="#0b5c14" />
        </svg>
    );
}

export function PixelCastle({ width = 260, className = '', style }) {
    const B = '#c85422';
    const D = '#8f3312';
    const K = '#000';
    return (
        <svg viewBox="0 0 40 34" width={width} shapeRendering="crispEdges" className={className} style={style} aria-hidden="true">
            {/* battlements */}
            {[8, 12, 16, 24, 28].map((x) => (
                <rect key={x} x={x} y="6" width="3" height="4" fill={B} />
            ))}
            <rect x="6" y="10" width="28" height="4" fill={B} />
            {/* towers */}
            <rect x="2" y="2" width="6" height="4" fill={B} />
            <rect x="32" y="2" width="6" height="4" fill={B} />
            <rect x="2" y="6" width="6" height="24" fill={B} />
            <rect x="32" y="6" width="6" height="24" fill={B} />
            {/* main body */}
            <rect x="8" y="14" width="24" height="16" fill={B} />
            {/* mortar lines */}
            {[16, 20, 24, 28].map((y) => (
                <rect key={y} x="8" y={y} width="24" height="1" fill={D} />
            ))}
            {[8, 12, 16, 20, 24, 28].map((y) => (
                <rect key={`t${y}`} x="2" y={y} width="6" height="1" fill={D} />
            ))}
            {[8, 12, 16, 20, 24, 28].map((y) => (
                <rect key={`u${y}`} x="32" y={y} width="6" height="1" fill={D} />
            ))}
            {/* door */}
            <rect x="17" y="20" width="6" height="10" fill={K} />
            <rect x="18" y="18" width="4" height="3" fill={K} />
            {/* windows */}
            <rect x="12" y="16" width="3" height="4" fill={K} />
            <rect x="25" y="16" width="3" height="4" fill={K} />
            {/* base */}
            <rect x="0" y="30" width="40" height="4" fill={D} />
        </svg>
    );
}

export function PixelFlagpole({ height = 300, className = '', style, flagClass = '', flagStyle }) {
    return (
        <div className={className} style={{ position: 'relative', height, width: 46, ...style }}>
            {/* ball on top */}
            <div
                style={{
                    position: 'absolute',
                    left: 9,
                    top: 0,
                    width: 20,
                    height: 20,
                    background: '#43b047',
                    boxShadow: '0 -4px 0 0 #000, 0 4px 0 0 #000, -4px 0 0 0 #000, 4px 0 0 0 #000',
                }}
            />
            {/* pole */}
            <div
                style={{
                    position: 'absolute',
                    left: 16,
                    top: 18,
                    width: 6,
                    height: height - 18,
                    background: '#e8e8e8',
                    boxShadow: '-3px 0 0 0 #000, 3px 0 0 0 #000',
                }}
            />
            {/* flag */}
            <svg
                viewBox="0 0 16 16"
                width="64"
                shapeRendering="crispEdges"
                className={flagClass}
                style={{ position: 'absolute', left: -46, top: 34, ...flagStyle }}
                aria-hidden="true"
            >
                <rect x="0" y="0" width="16" height="16" fill="#0b8a3a" />
                <rect x="0" y="0" width="16" height="1" fill="#000" />
                <rect x="0" y="15" width="16" height="1" fill="#000" />
                <rect x="0" y="0" width="1" height="16" fill="#000" />
                {/* star cut-out */}
                <rect x="7" y="3" width="2" height="2" fill="#fff" />
                <rect x="5" y="5" width="6" height="2" fill="#fff" />
                <rect x="4" y="7" width="8" height="2" fill="#fff" />
                <rect x="5" y="9" width="6" height="2" fill="#fff" />
                <rect x="5" y="11" width="2" height="2" fill="#fff" />
                <rect x="9" y="11" width="2" height="2" fill="#fff" />
            </svg>
        </div>
    );
}

/** Small helper for coin HUD icon */
export function CoinIcon({ size = 20, className = '', style }) {
    return <PixelSprite map={COIN} className={className} style={{ width: size * 0.8, height: size, ...style }} />;
}

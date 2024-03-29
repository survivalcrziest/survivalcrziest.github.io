
/*    <!-- TODO: Fix options initialExpandLevel -->
<!-- import { deriveOptions } from 'markmap-view'; -->
<!-- const markmapOptions = deriveOptions(jsonOptions); -->
*/


async function loadMd() {    
    const response = await fetch('https://survivalcrziest.github.io/ai/discovery.md')
    const text = await response.text()
    // console.log("Text:\n" + text)
    
    // TODO: Ideally everything below this line should be outside of loadMd()
    // loadMd() should return just the Markdown text...
    // ...but I'm too stupid to extract <value> from the Promise returned by fetch	
    var markdown = text;
    //console.log("Markdown:\n" + markdown);
    
    // load with <script>
    const { markmap } = window;
    
    const { Markmap, loadCSS, loadJS, Transformer } = markmap;

    const transformer = new Transformer();
    // 1. transform Markdown
    const { root, features } = transformer.transform(markdown);
    // 2. get assets
    // either get assets required by used features
    const { styles, scripts } = transformer.getUsedAssets(features);

    let jsonOptions = {
        autoFit: true,
        initialExpandLevel: 1
    };
    /*const isMacintosh = typeof navigator !== 'undefined' && navigator.userAgent.includes('Macintosh');
    let jsonOptions = {
        autoFit: false,
        color: node => {
          var _node$state;
          return defaultColorFn(`${((_node$state = node.state) == null ? void 0 : _node$state.path) || ''}`);
        },
        duration: 500,
        embedGlobalCSS: true,
        fitRatio: 0.95,
        maxWidth: 0,
        nodeMinHeight: 16,
        paddingX: 8,
        scrollForPan: true,
        spacingHorizontal: 80,
        spacingVertical: 5,
        initialExpandLevel: 1,
        zoom: true,
        pan: true,
        toggleRecursively: false
      };*/
    const { deriveOptions } = markmap;
    const markmapOptions = deriveOptions(jsonOptions);

    // or get all possible assets that could be used later
    //const { styles, scripts } = transformer.getAssets(features);
    
    // 1. load assets
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });
    
    // 2. create markmap
    // `options` is optional, i.e. `undefined` can be passed here
    // TODO: initialExpandLevel, markmapOptions
    Markmap.create("#mindmap", markmapOptions, root);
}


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

    console.log('ss-->');
    console.log(Markmap);

    const transformer = new Transformer();
    // 1. transform Markdown
    const { root, features } = transformer.transform(markdown);
    // 2. get assets
    // either get assets required by used features
    const { styles, scripts } = transformer.getUsedAssets(features);

    //const { deriveOptions } = markmap-view;
    //const markmapOptions = deriveOptions(jsonOptions);
    
    // or get all possible assets that could be used later
    //const { styles, scripts } = transformer.getAssets(features);
    
    // 1. load assets
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });
    
    // 2. create markmap
    // `options` is optional, i.e. `undefined` can be passed here
    // TODO: initialExpandLevel, markmapOptions
    Markmap.create("#mindmap", null, root);
}

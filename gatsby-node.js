exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    actions.setWebpackConfig({
      node: {
        fs: 'empty'
      },
      module: stage === "build-html" ? {
        rules: [
          {
            test: /web-audio-beat-detector/,
            use: loaders.null()
          }
        ]
      } : undefined
    })
  }
import './editor-ui.css'

export default () => {
  const containerElement = new DOMParser().parseFromString(
    `
		<div class="editor-ui">
			<h1>Level Editor</h1>
		</div>
	`,
    'text/html',
  ).body.firstChild

  return {
    domElement: containerElement,
  }
}

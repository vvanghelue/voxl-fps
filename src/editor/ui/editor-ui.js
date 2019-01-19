import './editor-ui.css'

export default () => {
  const containerElement = new DOMParser().parseFromString(
    `
		<div class="editor-ui">

		</div>
	`,
    'text/html',
  ).body.firstChild

  return {
    domElement: containerElement,
  }
}

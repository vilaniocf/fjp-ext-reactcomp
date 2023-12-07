import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Component from './AddGraph.jsx'

export default Node.create({
  name: 'reactComponent',
  group: 'block',
  atom: true,

  addAttributes(props) {
    return {
      props
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes.props ? HTMLAttributes.props.component.props : HTMLAttributes)]
  },

  addNodeView(props) {
    return ReactNodeViewRenderer(Component, {props})
  },

  addCommands() {
    return {
      insertReactComponent: (options) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create({props: options})
        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
        return true
      },

      insertReactComponentAtIndex: (index, options) => ({ tr, dispatch }) => {
        const { doc } = tr;
        const node = this.type.create({ props: options });
        
        if (dispatch) {
          if (index >= 0 && index <= doc.content.childCount) {
            let pos = 0;
      
            for (let i = 0; i < index; i++) {
              pos += doc.child(i).nodeSize;
            }
            tr.insert(pos, node);
          }
        }
      
        return true;
      },
      
    }
  },
})

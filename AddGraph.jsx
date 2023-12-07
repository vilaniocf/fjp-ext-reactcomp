import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default ({node, ...props}) => {

  return (
    <NodeViewWrapper className="react-component">
      {node.attrs.props&&node.attrs.props.component}
    </NodeViewWrapper>
  )
}
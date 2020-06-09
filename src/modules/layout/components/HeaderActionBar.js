// @flow

import * as React from 'react'

import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

const ActionItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > *,
  & img,
  button {
    width: calc(0.8 * ${props => props.theme.dimensions.headerHeightLarge}px);
    height: calc(0.8 * ${props => props.theme.dimensions.headerHeightLarge}px);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    cursor: pointer;

    @media ${props => props.theme.dimensions.smallViewport} {
      width: calc(0.8 * ${props => props.theme.dimensions.headerHeightSmall}px);
      height: calc(0.8 * ${props => props.theme.dimensions.headerHeightSmall}px);
    }
  }

  & img {
    box-sizing: border-box;
    padding: 22%;
    object-fit: contain;
  }
`

type PropsType = {|
  className?: string,
  children: Array<React.Node>
|}

/**
 * Designed to work with Header. In the ActionBar you can display icons as link or dropDown involving actions like
 * 'Change language', 'Change location' and similar items.
 */
class HeaderActionBar extends React.PureComponent<PropsType> {
  componentDidMount () {
    /* https://www.npmjs.com/package/react-tooltip#1-using-tooltip-within-the-modal-eg-react-modal- */
    ReactTooltip.rebuild()
  }

  render () {
    const { children, className } = this.props
    return (
      <ActionItems className={className}>
        {children}
      </ActionItems>
    )
  }
}

export default HeaderActionBar

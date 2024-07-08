import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{ $disabled: boolean }>`
  background-color: transparent;
  cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
  pointer-events: ${props => (props.$disabled ? 'none' : 'default')};
  padding: 0;
  border: none;
  text-align: start;
`

type ButtonProps = {
  onClick: () => void
  children: ReactNode
  label: string
  type?: 'submit' | 'button'
  disabled?: boolean
  tabIndex?: number
  className?: string
}

const Button = ({
  onClick,
  children,
  label,
  tabIndex,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps): ReactElement => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    $disabled={disabled}
    aria-label={label}
    tabIndex={tabIndex}
    type={type}
    className={className}>
    {children}
  </StyledButton>
)

export default Button

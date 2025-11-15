import { Input as CInput, InputGroupProps, InputProps as CInputProps, InputGroup } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuUser } from "react-icons/lu"

// @ts-ignore
interface InputProps extends InputGroupProps {
    children?: ReactNode
    inputProps?:  CInputProps
}

const Input = ({inputProps,  ...others}:InputProps) => {
  return (
    <InputGroup startElement={<LuUser />} {...others}>
      <CInput placeholder="Username" {...inputProps} />
    </InputGroup>
  )
}

export default Input
import styled from 'styled-components'
import { spacing } from '../utils'

const ShortcutSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${spacing(0.5)};
    padding: ${spacing(2)};
    border-right: 1px solid #DAE4EB;
`

export default {
  ShortcutSection,
}

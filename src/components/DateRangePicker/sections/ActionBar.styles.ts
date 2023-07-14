import styled from 'styled-components'
import { spacing } from '../utils'

const NakedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing(1)};
`

const Container = styled(NakedContainer)`
  padding: ${spacing(2)};
  border-top: 1px solid #DAE4EB;
`

const Group = styled(NakedContainer)``

export default {
  Container,
  Group,
}

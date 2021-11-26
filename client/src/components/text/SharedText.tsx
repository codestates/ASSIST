import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Light } from '../../theme/fonts';

export const BoldText = styled(Bold)`
  font-size: ${(props: { size?: number }) => props.size || 22}px;
  color: ${colors.darkGray};
`;

export const LightText = styled(Light)`
  font-size: ${(props: { size?: number }) => props.size || 22}px;
  color: ${colors.darkGray};
`;

export const SubText = styled(Light)`
  color: ${colors.darkGray};
`;

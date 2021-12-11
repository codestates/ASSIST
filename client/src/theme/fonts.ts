import styled from 'styled-components/native';

type styleProps = {
  white?: boolean;
  darkGray?: boolean;
  gray?: boolean;
  lightGray?: boolean;
  whiteSmoke?: boolean;
  blue?: boolean;
  red?: boolean;
  yellow?: boolean;
  size?: number;
};

const getColor = ({
  white,
  darkGray,
  gray,
  lightGray,
  whiteSmoke,
  blue,
  red,
  yellow,
}: styleProps) => {
  if (blue) return '#006FAD';
  if (white) return '#FFFFFF';
  if (darkGray) return '#3C3C3C';
  if (gray) return '#868686';
  if (lightGray) return '#DDDDDD';
  if (whiteSmoke) return '#F5F5F5';
  if (red) return '#AD0000';
  if (yellow) return '#FEE500';
  return '#3C3C3C';
};

const TextPrototype = styled.Text`
  color: ${(props: styleProps) => getColor(props)};
  font-size: ${(props: styleProps) => (props.size ? `${props.size}px` : '15px')};
`;

export const Bold = styled(TextPrototype)`
  font-family: 'SpoqaHanSansNeo-Bold';
`;

export const Medium = styled(TextPrototype)`
  font-family: 'SpoqaHanSansNeo-Medium';
`;

export const Regular = styled(TextPrototype)`
  font-family: 'SpoqaHanSansNeo-Regular';
`;

export const Light = styled(TextPrototype)`
  font-family: 'SpoqaHanSansNeo-Light';
`;

export const Thin = styled(TextPrototype)`
  font-family: 'SpoqaHanSansNeo-Thin';
`;

import styled from 'styled-components';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

export const Description = styled.div`
  // margin-bottom: 1.875rem;
  // color: var(--text-main-color);
  // font-size: ${FONT_SIZE.xs};
  // font-weight: ${FONT_WEIGHT.regular};
  //
  // @media only screen and ${media.xs} {
  //   font-size: ${FONT_SIZE.xxs};
  // }
  //
  // @media only screen and ${media.md} {
  //   font-size: ${FONT_SIZE.xs};
  // }
`;

export const Text = styled(BaseTypography.Text)`
  color: var(--text-main-color);

  &:hover {
    text-decoration: underline;
  }
`;

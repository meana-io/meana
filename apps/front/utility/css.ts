import { alpha } from '@mui/material/styles';

interface BgBlurProps {
  color: string;
  blur: number;
  opacity: number;
  imgUrl?: string;
}
export const bgBlur = ({
  color = '#000000',
  blur = 6,
  opacity = 0.8,
  imgUrl,
}: BgBlurProps) => {
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
};

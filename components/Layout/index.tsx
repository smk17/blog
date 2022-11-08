import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children?: React.ReactNode;
}

export const BlogLayout = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const isHome = router.route === '/';
    console.log('isHome', isHome);

    document.body.style.cssText = `--header-position: sticky;
        --header-inner-position: sticky;
        --content-offset: ${isHome ? 116 : 0}px;
        --header-height: ${isHome ? 180 : 64}px;
        --header-mb: ${isHome ? -116 : 0}px;
        --avatar-image-transform: ${
          isHome ? 'translate3d(0rem, 0, 0) scale(1)' : 'translate3d(0.125rem, 0, 0) scale(0.5625)'
        };
        --avatar-border-transform: ${
          isHome
            ? 'translate3d(-0.222222rem, 0, 0) scale(1.77778)'
            : 'translate3d(0rem, 0, 0) scale(1)'
        };
        --avatar-border-opacity: 0;
        --header-top: 0px;
        --avatar-top: 0px;`;
    const handleScroll = (e: Event) => {
      console.log('handleScroll', e);
      // --header-inner-position: fixed;
    };
    document.getElementById('__next')!.addEventListener('scroll', handleScroll, false);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {});
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
        </div>
      </div>
      <div className="relative">
        <Header />
        <div style={{ height: 'var(--content-offset)' }}></div>
        {children}
        <Footer />
      </div>
    </>
  );
};

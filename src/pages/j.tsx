import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const JumpPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const url = router.query.url;

    if (url == undefined || url == '') {
      return;
    }

    location.href = router.query.url as string;
  }, [router.query]);

  return router.query.url == undefined || router.query.url == '' ? (
    <>Url not specified.</>
  ) : (
    <>Redirecting...</>
  );
};

export default JumpPage;

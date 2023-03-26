function Error({ statusCode }:any) {
  return (
    <p>
      {statusCode
        ? `ERORR COK GAADA HALAMAN INI!`
        : 'REFRESH BURU '}
    </p>
  )
}

Error.getInitialProps = ({ res, err }:any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
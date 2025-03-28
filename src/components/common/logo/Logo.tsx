type LogoProps = {
  logocolor?: string;
};

export default function Logo({ logocolor = "white" }: LogoProps) {
  const logoPaths: Record<string, string> = {
    black: "/img/photos/sapluna_logo-black.png",
    orange: "/img/photos/sapluna_logo-orange.png",
    white: "/img/photos/sapluna_logo-white.png",
  };

  return <img src={logoPaths[logocolor] || logoPaths.black} alt="logo" />;
}

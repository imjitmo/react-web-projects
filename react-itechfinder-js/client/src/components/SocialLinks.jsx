import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io';
import { IoLogoTiktok } from 'react-icons/io5';

export default function SocialLinks(props) {
  const { facebook, instagram, twitter, tiktok, youtube, linkedin } = props;

  return (
    <div className="flex flex-row gap-2 items-center">
      {facebook && (
        <a href={facebook} target="_blank" rel="noreferrer" className="tooltip" data-tip="facebook">
          <IoLogoFacebook className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noreferrer" className="tooltip" data-tip="instagram">
          <IoLogoInstagram className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noreferrer" className="tooltip" data-tip="twitter">
          <FaXTwitter className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
      {tiktok && (
        <a href={tiktok} target="_blank" rel="noreferrer" className="tooltip" data-tip="tiktok">
          <IoLogoTiktok className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
      {youtube && (
        <a href={youtube} target="_blank" rel="noreferrer" className="tooltip" data-tip="youtube">
          <IoLogoYoutube className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noreferrer" className="tooltip" data-tip="linkedin">
          <IoLogoLinkedin className="size-6 fill-blue-600 hover:opacity-75" />
        </a>
      )}
    </div>
  );
}

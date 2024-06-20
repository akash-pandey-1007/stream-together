import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const myMeetingRef = React.createRef(null);

  const joinMeeting = async () => {
    // generate Kit Token
    const appID = 133149212;
    const serverSecret = "df8b051c06c9b278947a6c2d6a26b505";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    const meetingLink = `<span class="math-inline">{window\.location\.protocol\}//</span>{window.location.host}<span class="math-inline">\{window\.location\.pathname\}?roomID\=</span>{roomID}`;
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Use zp object here when it's available
    zp.joinRoom({
      container: myMeetingRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  React.useEffect(() => {
    joinMeeting(); // Call the joinMeeting function after the component mounts
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={myMeetingRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

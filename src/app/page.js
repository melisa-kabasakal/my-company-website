export const dynamic = "force-dynamic";

import I18nClientWrapper from "./I18nClientWrapper";
import HomeClient from "./HomeClient";

export default function Page() {
  return (
    <I18nClientWrapper>
      <HomeClient />
    </I18nClientWrapper>
  );
}

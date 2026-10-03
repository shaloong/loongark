import { useState } from "react";
import * as L from "@loongark/react";
export default { title: "Components/Attachment" };
export const Basic = {
  render: () => (
    <L.LoongArkAttachment
      name="Design review.pdf"
      size={2457600}
      href="data:text/plain,Review"
    />
  ),
};
export const Uploading = {
  render: () => (
    <L.LoongArkStack>
      <L.LoongArkAttachment
        name="Screenshots.zip"
        size={8388608}
        status="uploading"
        progress={48}
      />
      <L.LoongArkAttachment name="Preparing-upload.zip" status="uploading" />
    </L.LoongArkStack>
  ),
};
function Retry() {
  const [failed, setFailed] = useState(true),
    [removed, setRemoved] = useState(false);
  return removed ? (
    <L.LoongArkButton onClick={() => setRemoved(false)}>
      Restore attachment
    </L.LoongArkButton>
  ) : (
    <L.LoongArkAttachment
      name="Design-review-with-long-file-name.pdf"
      status={failed ? "error" : "ready"}
      href="data:text/plain,Review"
      onRetry={() => setFailed(false)}
      onRemove={() => setRemoved(true)}
    />
  );
}
export const Error = { render: () => <Retry /> };
export const Disabled = {
  render: () => (
    <L.LoongArkAttachment
      name="Private draft.pdf"
      href="data:text/plain,Draft"
      disabled
      onRemove={() => {}}
    />
  ),
};

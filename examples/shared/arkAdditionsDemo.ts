/** 本地确定性图形，裁剪测试不依赖远程图片或跨域请求。 */
export const cropSource =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="640" height="400" fill="#F2F2F2"/><path d="M0 320L200 80L400 320Z" fill="#0A3565"/><path d="M240 400L440 120L640 400Z" fill="#006EFF"/><circle cx="520" cy="80" r="40" fill="#F58220"/></svg>',
  );
export const inspectionData = {
  project: "LoongArk",
  enabled: true,
  components: ["ImageCropper", "JsonTreeView"],
  metadata: { frameworks: 4, note: null },
  unsafeText: "<script>window.__jsonExecuted=true</script>",
};

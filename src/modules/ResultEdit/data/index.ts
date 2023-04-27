import { uploadFile } from "@akar/xs-editor";
/**
 * 配合ckeditor编辑器的上传类
 * */
export const UploadAdapter = class UploadAdapter {
  #loader;
  #uploadFileUrl = "";

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    this.loader.file.then((res) => {
      let form = new FormData();
      form.append("file", res);
      uploadFile({
        type: "POST",
        url: `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=_article`,
        data: form,
      })
    });
  }

  abort() {}
};

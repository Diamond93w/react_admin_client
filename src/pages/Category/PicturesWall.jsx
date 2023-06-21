import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Upload, App } from 'antd';
import ImgCrop from 'antd-img-crop';
import { reqDeleteImg } from '../../api';


const PicturesWall = forwardRef((props, ref) => {
  const { message } = App.useApp()
  const [fileList, setFileList] = useState([])


  // 用于获取已经上传的图片的name和url
  const getItem = () => {
    return fileList.map(file => file.url)  // name:['image-1687081053955.jpg']
  }

  const onChange = async ({ file, fileList }) => {
    if (file.status === 'done') {
      const result = file.response  // {status:0, data:{name:'xx.jpg', url:'图片地址'}}
      if (result.status === 0) {
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
        message.success('图片上传成功!')
      } else {
        message.error('图片上传失败!')
      }
    } 
    // else if (file.status === 'removed') {
    //   const result = await reqDeleteImg(file.name)
    //   if (result.status === 0) {
    //     message.success('删除图片成功!')
    //   } else {
    //     message.error('删除图片失败!')
    //   }
    // }
    setFileList(fileList);
  };

  // 预览照片：在一个新的标签页里查看
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useImperativeHandle(ref, () => ({
    getItem
  }))


  return (
    <ImgCrop rotationSlider>
      {/* 属性accept：设置接受哪种类型的上传文件 */}
      <Upload
        action="/manage/img/upload"  // action：上传图片到服务器的地址
        listType="picture-card"  // 上传列表的样式类型设置
        name='image'  // 请求参数名
        fileList={fileList}  // 指定所有已上传图片文件对象的数组
        onChange={onChange}
        onPreview={onPreview}
      >
        {/* 规定可以上传的图片的数量 */}
        {fileList.length < 3 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
})

export default PicturesWall
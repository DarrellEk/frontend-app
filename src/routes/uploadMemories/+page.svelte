<script>
    import { onMount } from 'svelte';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { uploadMedia } from '../../utils/s3-uploader.js'
    import { goto } from '$app/navigation';
    import { getAccessToken, getUserId } from '../../utils/auth.js'
    let formErrors={};

    async function uploadImage(evt) {
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      console.log(fileName)
      console.log(fileUrl)

      const userId =getUserId();

      const pictureData = {
        name: evt.target['name'].value,
        description: evt.target['description'].value,
        user: {
          connect: {
            id: userId,
          },
        },
        pictureUrl: fileUrl,
      };


      const accessToken = getAccessToken();

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/pictures', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(pictureData)
    });
    console.log(accessToken)


    if (resp.status == 200) {
  
          postUploadImage();
        } else {
            const res = await resp.json();
      console.error('Upload failed 2:', res);
      if (res.error) {
      formErrors = res.error;
    } else {
      console.error('Upload failed 1:', res);
    }
  }
}
    onMount(() => {
    });
  </script>
 
 <svelte:head>
<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

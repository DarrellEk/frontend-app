<script>
    import { uploadMedia } from '../../utils/s3-uploader.js';
	import { generateFileWithUniqueName } from '../../utils/filename-generator.js';
	import { getUserId } from '../../utils/auth.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getTokenFromLocalStorage } from '../../utils/auth.js';
    import {isLoggedIn} from "../../utils/auth";

    let LoggedInValue;
    isLoggedIn.subscribe((value)=>{
        LoggedInValue = value;
    });

    let formErrors = {};

    function uploadIsValid(imgData) {
		if (typeof imgData['file'].files[0] === 'undefined') {
			formErrors['file'] = 'no file uploaded';
			return false;
		} else if (!imgData['file'].files[0].type.includes('image')) {
			formErrors['file'] = 'must be an image';
			return false;
		}

		return true;
	}

    async function matchMemoryandUser(memoryId){
        const userId = getUserId()
        let memoryuserId
        try{
        const resp = await fetch(
            PUBLIC_BACKEND_BASE_URL+"/memories/"+memoryId,
            {
                method:"GET",
                mode:"cors",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+getTokenFromLocalStorage()
                },
            }
        );
        //const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/memories/'+memoryId);

        const res = await resp.json();
        if(resp.status==200){
           memoryuserId = res.userId
           if(userId === memoryuserId){
                return true;
           }else{
            alert("not your memory.")
            return false;
           }
        }else{
        alert("cannot locate any memory with this id.")
        return false;
    }
        }catch{
            alert("error. try again later.")
            return false;
        }
    }

    async function uploadImage(evt) {
		//evt.preventDefault();
        if(!LoggedInValue){
            alert("Log in first")
            return;
        }

        if(await matchMemoryandUser(evt.target['memory'].value)==false){
            return;
        }



		if (!uploadIsValid(evt.target)) {
			return;
		}

		const fileToUpload = generateFileWithUniqueName(evt.target['file'].files[0]);
		const [fileName, fileUrl] = await uploadMedia(fileToUpload);

		try {
			const imgData = {
				url: fileUrl,
				memoryId: parseInt(evt.target['memory'].value),
				description: evt.target['description'].value
			};

			const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/images', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getTokenFromLocalStorage()
				},
				body: JSON.stringify(imgData)
			});

			if (resp.status == 200) {
				alert('Upload successful!');
			} else {
				const res = await resp.json();
				alert(JSON.stringify(res));
			}
		} catch (err) {
			alert(err);
		}
	}
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div>
<h2 class="text-3xl">Upload Image</h2>
<form on:submit|preventDefault={uploadImage}>
    <div class="flex flex-col lg:flex-row">
        <div class="form-control w-full lg:w-1/2 mt-2">
            <input class="file-input w-full max-w-xs" type="file" name="file" />
        </div>
        {#if 'file' in formErrors}
            <label class="label" for="file">
                <span class="label-text-alt text-red-500">{formErrors['file']}</span>
            </label>
        {/if}
        <div class="w-full lg:w-1/2"></div>
    </div>

    <div class="form-control w-full">
        <label class="label" for="memory"><span class="label-text">Memory Id</span></label>
        <input type="number" name="memory" placeholder="" class="input input-bordered w-full" />
        {#if 'memory' in formErrors}
            <label class="label" for="memory">
                <span class="label-text-alt text-red-500">{formErrors['memory']}</span>
            </label>
        {/if}
    </div>
    
    <class class="form-control w-full">
        <label class="label" for="description"><span class="label-text">Description</span></label>
        <textarea
            name="description"
            class="textarea textarea-bordered"
            placeholder="Reunion Dinner"
        ></textarea>
        {#if 'description' in formErrors}
            <label class="label" for="description">
                <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
            </label>
        {/if}
    </class>
    <div class="form-control w-full mt-4"><button class="btn btn-md"> Upload</button></div>
</form>
</div>
<script>
	export let hidden, onPostSubmit;

	import { uploadMedia } from '../utils/s3-uploader.js';
	import { generateFileWithUniqueName } from '../utils/filename-generator.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { user } from '../lib/store';
	import { getUserId } from '../utils/auth';
	import { getTokenFromLocalStorage } from '../utils/auth';
	import {isLoggedIn} from "../utils/auth";

    let LoggedInValue;
    isLoggedIn.subscribe((value)=>{
        LoggedInValue = value;
    });

	let title, description;

	function uploadIsValid(imgData) {
		if (typeof imgData['image'].files[0] === 'undefined') {
			//formErrors['image'] = 'no file uploaded';
			alert("No image uploaded")
			return false;
		} else if (!imgData['image'].files[0].type.includes('image')) {
			//formErrors['image'] = 'must be an image';
			alert("Not an image")
			return false;
		}

		return true;
	}

	async function onSubmit(evt) {
		
	
		if(!LoggedInValue){
            alert("Log in first")
            return;
        }

		let memoryId;
		const userId = getUserId();
		evt.preventDefault()

		const memory = {
			id: 0,
			location: 'London',
			time: Date.now(),
			description,
			title,
			created_at: Date.now(),
			updated_at: null,
			images: [],
			videos: [],
			user: user
		};

		$user.memories = [...$user.memories, memory];

		console.log(memory);


		
		//code to send to actual database
		//first, create the memory in the database
		const memory2 = {
			location: 'London',
			time: new Date(),
			description: description,
			title: title,
			userId: userId
		}


		try{
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/memories', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getTokenFromLocalStorage()
				},
				body: JSON.stringify(memory2)
			});
			const res = await resp.json();
			if (resp.status == 200) {
				
				//extract the memory id
			    memoryId = res.id 
				alert('Memory ' +memoryId+' created!');
				
			} else {
				alert("Error creating memory: "+JSON.stringify(res));
				return;
			}
		}catch(err){
			alert("Error creating memory: "+err)
		}

		//next, upload the image to s3 bucket and save image in database, using previously obtained memory id
		if (!uploadIsValid(evt.target)) {
			
			return;
		}

		let [fileName, fileUrl] = [null, null]
		try{
		const fileToUpload = generateFileWithUniqueName(evt.target['image'].files[0]);
		[fileName, fileUrl] = await uploadMedia(fileToUpload);
		}catch(err){
			alert("Couldn't upload to s3: "+err)
			return;
		}

		try {
			const imgData = {
				url: fileUrl,
				memoryId: memoryId,
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
				alert('Upload image successful!');
			} else {
				const res = await resp.json();
				alert(JSON.stringify(res));
			}
		} catch (err) {
			alert(err);
		}

		onPostSubmit();
	}
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<form
	class="fixed z-[1000] rounded-sm w-1/3 flex flex-col bottom-5 right-5 bg-white p-5 gap-1 text- {hidden &&
		'hidden'}"
	on:submit={onSubmit}
>
	<h5>Enter details for your memory</h5>
	<input type="text" bind:value={title} placeholder="Title" />
	<input type="text" bind:value={description} placeholder="Description" />
	<div class="flex gap-1 items-center">
		<div>Images:</div>
		<input type="file" name="image"/>
	</div>
	<!-- <div class="flex gap-1 items-center">
		<div>Videos:</div>
		<input type="file" />
	</div> -->
	<button class="btn">Submit</button>
</form>

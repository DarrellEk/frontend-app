<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser, isValidToken } from '../../../utils/auth';

    let formErrors = {};

    function postLogIn(){
      isValidToken();
      goto('/')
    }
  
    async function logIn(evt) {
      evt.preventDefault();
  
      const userData = {
        email: evt.target['email'].value,
        password: evt.target['password'].value,
      };
  
      const resp = await authenticateUser(userData.email, userData.password);

      if(resp.success){
        postLogIn();
      }else{
        alert("Invalid email or password.")
      }
    }
  </script>
  
  <h1 class="text-center text-xl">Sign In to Your Account</h1>
  <div class="text-center">
    <a class="link-hover italic text-xs" href="/users/signUp">Don't have an account? Click here to sign up.</a>
  </div>
  <div class="flex justify-center items-center mt-8">
    <form on:submit={logIn} class="w-1/3">
      <div class="form-control w-full">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>
        <input type="text" name="email" placeholder="johndoe@example.com" class="input input-bordered w-full" />
        {#if 'email' in formErrors}
        <label class="label" for="email">
          <span class="label-text-alt text-red-500">{formErrors['email']}</span>
        </label>
        {/if}
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
        {#if 'password' in formErrors}
        <label class="label" for="password">
          <span class="label-text-alt text-red-500">{formErrors['password']}</span>
        </label>
        {/if}
      </div>
  
      <div class="form-control w-full mt-4">
        <button class="btn btn-md">Sign In</button>
      </div>
    </form>
  </div>
  
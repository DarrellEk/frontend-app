<script>
    import { onMount } from 'svelte';

    const motivationalQuotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    ];

    let currentQuote = getRandomQuote();
    let quoteElement;

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    onMount(() => {
        const interval = setInterval(() => {
            quoteElement.classList.add('fade-out');
            setTimeout(() => {
                currentQuote = getRandomQuote();
                quoteElement.classList.remove('fade-out');
            }, 500); // Adjust the timeout based on your transition duration
        },5000);

        return () => clearInterval(interval); // Cleanup on unmount
    });
</script>

<style>
    * {
        font-family: serif;
    }

    .homepage {
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .fade-transition {
        transition: opacity 1s;
    }

</style>

<section class="homepage">
    <p bind:this={quoteElement} class="text-4xl font-bold font-serif fade-transition">{currentQuote}</p>
    <a href="/main" class="btn btn-secondary mt-10 font-serif text-xl">Create Your memories</a>
</section>

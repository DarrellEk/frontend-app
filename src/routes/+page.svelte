<script>
    import { onMount } from 'svelte';

    const motivationalQuotes = [
        "\"Memories may fade with time, but the love we put into creating them lasts forever.\"",
        "\"In the album of life, each snapshot tells a story of cherished times.\"",
        "\"Our hearts hold a collection of moments, each one a precious gem in the mosaic of our lives.\"",
        "\"Every memory is a page in the book of our lives, and each chapter is a testament to the beauty of our journey.\"",
        "\"Life's journey is marked by the imprints of joy and the footprints of those we hold dear.\"",
        "\"The most beautiful things are not seen but felt—like the warmth of a cherished memory.\"",
        "\"Our hearts hold a collection of moments, each one a precious gem in the mosaic of our lives.\"",
        "\"The best souvenirs are not found in shops but in the moments that become lifelong memories.\"",
    ];

    let currentQuote = getRandomQuote();
    let quoteElement;

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    onMount(() => {
        const interval = setInterval(() => {
            quoteElement.style.opacity = 0; // Set opacity to 0 for fade-out effect
            setTimeout(() => {
                currentQuote = getRandomQuote();
                quoteElement.style.opacity = 1; // Set opacity back to 1 for fade-in effect
            }, 2000); // Adjust the timeout based on your transition duration
        }, 9000);

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
        transition: opacity 2s;
    }
</style>

<section class="homepage">
    <p bind:this={quoteElement} class="text-3xl font-bold font-serif fade-transition">{currentQuote}</p>
    <a href="/main" class="btn btn-secondary mt-10 font-serif text-xl">Create Your memories</a>
</section>

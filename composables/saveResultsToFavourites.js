const savedResultsFav = ref([]);

// load the initial state from local storage
function loadInitialState() {
  if (process.client) {
    const storedResults = localStorage.getItem('savedResultsFav');
    if (storedResults) {
      savedResultsFav.value = JSON.parse(storedResults);
    }
  }
}

loadInitialState();

export const saveResultsToFavourites = () => {
  function saveResult(result) {
    if (!savedResultsFav.value.find((r) => r.name === result.name)) {
      // save to browser
      savedResultsFav.value.push(result);
      if (process.client) {
        localStorage.setItem('savedResultsFav', JSON.stringify(savedResultsFav.value));
      }
    }
  }

  function removeResult(result) {
    savedResultsFav.value = savedResultsFav.value.filter(
      (r) => r.name !== result.name
    );
    // update local storage
    if (process.client) {
      localStorage.setItem('savedResultsFav', JSON.stringify(savedResultsFav.value));
    }
  }

  // Watcher to automatically update local storage when savedResultsFav changes
  if (process.client) {
    watch(savedResultsFav, (newValue) => {
      localStorage.setItem('savedResultsFav', JSON.stringify(newValue));
    });
  }

  return {
    savedResultsFav,
    saveResult,
    removeResult,
  };
};



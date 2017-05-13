const pagination = (numOfData, numPerPage, currentPage) => {
  // number of total pages
  let numOfPages = Math.floor(numOfData / numPerPage)
  const mod = numOfData % numPerPage
  if (mod) numOfPages += 1

  // start and end index of data array for displaying on the specified page
  const startIndex = (currentPage - 1) * numPerPage
  let endIndex = startIndex + numPerPage
  if (currentPage === numOfPages) endIndex = numOfData

  // previous and next page
  let previousPage = currentPage - 1
  if (currentPage === 1) previousPage = null
  let nextPage = currentPage + 1
  if (currentPage === numOfPages) nextPage = null

  // fist and last page
  const firstPage = 1
  const lastPage = numOfPages

  return {
    startIndex,
    endIndex,
    currentPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
    numOfPages,
  }
}

module.exports = pagination

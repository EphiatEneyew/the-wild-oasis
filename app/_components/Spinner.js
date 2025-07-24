function Spinner() {
  return ( 
  <div className="relative place-items-center justify-center">
    <div
      className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"
      role="status"
    ></div>
  </div>
  )
}

export default Spinner;

function App() {
  return (
    <div className="p-6 space-y-4 bg-white">
      {/* Text Colors */}
      <div className="text-primary">Primary Text</div>
      <div className="text-black">Black Text</div>
      <div className="text-white bg-black">white Text</div>
      <div className="text-teritary">Teritary Text</div>
      <div className="text-secondary">Secondary Text</div>
      <div className="text-red">Red Text</div>
      <div className="text-success">Success Text</div>
      <div className="text-warning">Warning Text</div>
      <div className="text-brown">Brown Text</div>
      <div className="text-purple">Purple Text</div>

      {/* Background Colors */}
      <div className="bg-primary text-white p-4 rounded text-center">bg-primary</div>
      <div className="bg-primary-hover text-white p-4 rounded text-center">bg-primary-hover</div>
      <div className="bg-primary-loading text-white p-4 rounded text-center">
        bg-primary-loading
      </div>
      <div className="bg-secondary p-4 rounded text-center">bg-secondary</div>
      <div className="bg-secondary-hover p-4 rounded text-center">bg-secondary-hover</div>
      <div className="bg-black text-white p-4 rounded text-center">bg-black</div>
      <div className="bg-white p-4 rounded text-center border">bg-white</div>
      <div className="bg-white-hover p-4 rounded text-center border">bg-white-hover</div>
      <div className="bg-light-gray p-4 rounded text-center">bg-light-gray</div>
      <div className="bg-yellow p-4 rounded text-center">bg-yellow</div>
      <div className="bg-blue p-4 rounded text-center">bg-blue</div>
      <div className="bg-purple p-4 rounded text-center">bg-purple</div>
      <div className="bg-star p-4 rounded text-center">bg-star</div>
      <div className="bg-gray p-4 rounded text-center">bg-gray</div>

      {/* Border Colors */}
      <div className="border border-primary p-2">Primary Border</div>
      <div className="border border-gray p-2">Gray Border</div>
      <div className="border border-light-gray p-2">Light Gray Border</div>
      <div className="border border-ghost p-2">ghost</div>
      <div className="border border-primary-hover p-2">primary-hover</div>
    </div>
  );
}

export default App;

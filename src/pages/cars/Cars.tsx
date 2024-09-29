function Cars() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-10">
        {/* filters */}
        <div className="col-span-2">filters</div>

        {/* cars */}
        <div className="col-span-8">Cars</div>
      </div>
    </section>
  );
}

export default Cars;

export default function Controls({
    region,
    setRegion,
    seed,
    setSeed,
    onRandomSeed,
    likes,
    setLikes,
    reviews,
    setReviews,
  }) {
    return (
      <div className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Region</label>
            <select
              className="form-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="us">English (US)</option>
              <option value="de">German (Germany)</option>
              <option value="ja">Japanese (Japan)</option>
            </select>
          </div>
  
          <div className="col-md-3">
            <label className="form-label">Seed</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={onRandomSeed}
              >
                🔀
              </button>
            </div>
          </div>
  
          <div className="col-md-3">
            <label className="form-label">
              Avg Likes: {likes.toFixed(1)}
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="10"
              step="0.1"
              value={likes}
              onChange={(e) => setLikes(parseFloat(e.target.value))}
            />
          </div>
  
          <div className="col-md-3">
            <label className="form-label">Avg Reviews</label>
            <input
              type="number"
              className="form-control"
              min="0"
              max="10"
              step="0.1"
              value={reviews}
              onChange={(e) => setReviews(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
    );
  }
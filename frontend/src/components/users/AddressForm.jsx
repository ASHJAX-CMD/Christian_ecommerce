const AddressForm = ({ formData, handleChange, handleSubmit, cancel }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4 max-w-md"
    >
      <h3 className="text-lg font-semibold">Address</h3>

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="zip"
        placeholder="Zip"
        value={formData.zip}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />
        Set as Default Address
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Address
        </button>

        <button
          type="button"
          onClick={cancel}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
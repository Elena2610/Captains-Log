const React = require("react");

function Edit({ log }) {
  return (
    <div className="p-4">
      <h2>Edit Log</h2>
      <form action={`/logs/${log._id}?_method=PUT`} method="POST">
        Tittle:{" "}
        <input
          type="text"
          name="title"
          defaultValue={log.title}
          required
        />
        Comment:
        <textarea
          name="entry"
          defaultValue={log.body}
          required
        ></textarea>
        Is Ship Broken? {""} {""}
        <input
          type="checkbox"
          name="shipIsBroken"
          defaultChecked={log.shipIsBroken}
        />
        <br/>
        <button
          type="submit"
          value="Update"
        > Update </button>
      </form>
    </div>
  );
}

module.exports = Edit;
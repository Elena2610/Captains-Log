const React = require("react");

function Index({ logs }) {
  return (
    <div>
      <a href="/logs/new">
        Create New Log
      </a>
      <h1>All Logs</h1>
      {logs.map((log) => {
        return (
            <div>
          <li key={log._id}>
            <a
              href={`/logs/${log._id}`}
            >
              {log.title}
            </a>
            <br />
            <a
              href={`/logs/${log._id}/edit`}
            >
              Edit Log
            </a>
            {""}
            <br/>
            <form method="POST" action={`/logs/${log._id}?_method=DELETE`}>
              <input
                type="submit"
                value="Delete"
              ></input>
            </form>
          </li>
          </div>
        );
      })}
    </div>
  );
}

module.exports = Index;
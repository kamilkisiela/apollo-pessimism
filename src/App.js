import React from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import faker from "faker";

class SingletonObject {
  constructor(name) {
    this.name = name;
  }
}

const singleton = new SingletonObject(`fooobaarbaz`);

function Item({ itemId }) {
  const result = useQuery(
    gql`
      query item($id: String!) {
        item(id: $id) @client {
          id
          value
        }
      }
    `,
    {
      variables: {
        id: itemId,
      },
      context: {
        singleton,
      },
    }
  );

  if (result.loading) {
    return <div>loading</div>;
  }

  if (result.error) {
    return <div>failed</div>;
  }

  if (result.data) {
    return <div>{result.data.item.id}</div>;
  }

  return <div>?</div>;
}

export function App() {
  const [mounted, setMounted] = React.useState(true);
  const [id, setId] = React.useState("init");
  const updateId = React.useCallback(() => {
    setId(faker.random.word);
  }, [setId]);
  const unmount = React.useCallback(() => {
    setMounted(false);
  }, [setMounted]);

  return (
    <div>
      <button onClick={unmount}>Unmount</button>
      {mounted && (
        <div>
          <button onClick={updateId}>Random id</button>
          <Item itemId={id} />
        </div>
      )}
    </div>
  );
}

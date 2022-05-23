import { memo, useEffect, VFC } from "react";
import { store } from "../redux/store";

interface LocalStorageUpdatedComponent {
  readonly children: readonly JSX.Element[];
}

const LocalStorageUpdaterComponent: VFC<LocalStorageUpdatedComponent> = ({ children }: LocalStorageUpdatedComponent) => {

  useEffect(() => {
    return store.subscribe(() => {
      localStorage.setItem('cart', JSON.stringify(store.getState().cart));
    });
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export const LocalStorageUpdater = memo(LocalStorageUpdaterComponent);

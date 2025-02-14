import type { SimpleStoreBase } from "octagonal-wheels/databases/SimpleStoreBase";
import { SimpleStoreIDB } from "octagonal-wheels/databases/SimpleStoreIDB";
import { PlatformSimpleStore, setSimpleStoreInstance } from "../base/SimpleStore.ts";

export class ObsidianSimpleStore extends PlatformSimpleStore {
    override initBackend(param: string): SimpleStoreBase<any> {
        return new SimpleStoreIDB(param);
    }
}

const simpleStoreAPI = new ObsidianSimpleStore();
void simpleStoreAPI.onInit().then(() => setSimpleStoreInstance(simpleStoreAPI));

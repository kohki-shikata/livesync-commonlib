import type { I18N_LANGS } from "./rosetta";

import type { TaggedType } from "octagonal-wheels/common/types";
export type { TaggedType };

export {
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_INFO,
    LOG_LEVEL_NOTICE,
    LOG_LEVEL_URGENT,
    LOG_LEVEL_VERBOSE,
} from "octagonal-wheels/common/logger.js";
export type { LOG_LEVEL } from "octagonal-wheels/common/logger.js";
import { RESULT_NOT_FOUND, RESULT_TIMED_OUT } from "octagonal-wheels/common/const.js";
export { RESULT_NOT_FOUND, RESULT_TIMED_OUT };
type ExtractPropertiesByType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K] extends U ? K : never;
};

export type FilterStringKeys<T> = keyof ExtractPropertiesByType<T, string | (string | undefined)>;

export type FilterBooleanKeys<T> = keyof ExtractPropertiesByType<T, boolean | (boolean | undefined)>;

export type FilterNumberKeys<T> = keyof ExtractPropertiesByType<T, number | (number | undefined)>;

export type FilePath = TaggedType<string, "FilePath">;
export type FilePathWithPrefixLC = TaggedType<string, "FilePathWithPrefixLC">;
export type FilePathWithPrefix = TaggedType<string, "FilePathWithPrefix"> | FilePath | FilePathWithPrefixLC;
export type DocumentID = TaggedType<string, "documentId">;

// docs should be encoded as base64, so 1 char -> 1 bytes
// and cloudant limitation is 1MB , we use 900kb;

export const MAX_DOC_SIZE = 1000; // for .md file, but if delimiters exists. use that before.
export const MAX_DOC_SIZE_BIN = 102400; // 100kb
export const VER = 10;

export const RECENT_MODIFIED_DOCS_QTY = 30;
export const LEAF_WAIT_TIMEOUT = 90000; // in synchronization, waiting missing leaf time out.
export const REPLICATION_BUSY_TIMEOUT = 3000000;

// Magic Special value for arguments or results.

export const CANCELLED = Symbol("cancelled");
export const AUTO_MERGED = Symbol("auto_merged");
export const NOT_CONFLICTED = Symbol("not_conflicted");
export const MISSING_OR_ERROR = Symbol("missing_or_error");
export const LEAVE_TO_SUBSEQUENT = Symbol("leave_to_subsequent_proc");
export const TIME_ARGUMENT_INFINITY = Symbol("infinity");

export const VERSIONING_DOCID = "obsydian_livesync_version" as DocumentID;
export const MILESTONE_DOCID = "_local/obsydian_livesync_milestone" as DocumentID;
export const NODEINFO_DOCID = "_local/obsydian_livesync_nodeinfo" as DocumentID;

/**
 * Represents the connection details required to connect to a CouchDB instance.
 */
export interface CouchDBConnection {
    /**
     * The URI of the CouchDB instance.
     */
    couchDB_URI: string;
    /**
     * The username to use when connecting to the CouchDB instance.
     */
    couchDB_USER: string;
    /**
     * The password to use when connecting to the CouchDB instance.
     */
    couchDB_PASSWORD: string;
    /**
     * The name of the database to use.
     */
    couchDB_DBNAME: string;
}

/**
 * Interface representing the settings for periodic replication.
 */
interface PeriodicReplicationSettings {
    /**
     * Indicates whether periodic replication is enabled.
     */
    periodicReplication: boolean;

    /**
     * The interval, in milliseconds, at which periodic replication occurs.
     */
    periodicReplicationInterval: number;
}

export type ConfigPassphraseStore = "" /* default */ | "LOCALSTORAGE" | "ASK_AT_LAUNCH";

/**
 * Represents the user settings that are encrypted.
 */
interface EncryptedUserSettings {
    /**
     * The store for the configuration passphrase.
     */
    configPassphraseStore: ConfigPassphraseStore;

    /**
     * The encrypted passphrase used for E2EE.
     */
    encryptedPassphrase: string;

    /**
     * The encrypted connection details for CouchDB.
     */
    encryptedCouchDBConnection: string;
}

/**
 * Interface representing the settings for different sync invocation methods.
 */
interface SyncMethodSettings {
    /**
     * Synchronise in Live. This is an exclusive setting against other sync methods.
     */
    liveSync: boolean;
    /**
     * automatically run sync on save.
     * File modification will trigger the sync, even if the file is not changed on the editor.
     */
    syncOnSave: boolean;
    /**
     * automatically run sync on starting the plug-in.
     */
    syncOnStart: boolean;
    /**
     * automatically run sync on opening a file.
     */
    syncOnFileOpen: boolean;
    /**
     * automatically run sync on editor save.
     * Different from syncOnSave, this is only reacts to the editor save event.
     */
    syncOnEditorSave: boolean;

    /**
     * The minimum delay between synchronisation operations (in milliseconds).
     * If the operation is triggered before this delay, the operation will be delayed until the delay is over, and executed as a single operation.
     */
    syncMinimumInterval: number;
}

/**
 * Interface representing the settings for file handling.
 */
interface FileHandlingSettings {
    /**
     * Use trash instead of actually delete.
     */
    trashInsteadDelete: boolean;
    /**
     * Do not delete the folder even if it has got empty.
     */
    doNotDeleteFolder: boolean;
    /**
     * Thinning out the changes and make a single change for the same file.
     */
    batchSave: boolean;
    batchSaveMinimumDelay: number;
    batchSaveMaximumDelay: number;

    /**
     * Maximum size of the file to be synchronized (in MB).
     */
    syncMaxSizeInMB: number;
    /**
     * Use ignore files.
     */
    useIgnoreFiles: boolean;
    /**
     * Ignore files pattern, i,e, `.gitignore, .obsidianignore` (This should be separated by comma)
     */
    ignoreFiles: string;
}

/**
 * Interface representing the settings for Hidden File Sync.
 */
interface InternalFileSettings {
    /**
     * Synchronise internal files.
     */
    syncInternalFiles: boolean;

    /**
     * Scan internal files before replication.
     */
    syncInternalFilesBeforeReplication: boolean;
    /**
     * Interval for scanning internal files (in seconds).
     */
    syncInternalFilesInterval: number;
    /**
     * Ignore patterns for internal files.
     * (Comma separated list of regular expressions)
     */
    syncInternalFilesIgnorePatterns: string;
    /**
     * Enable watch internal file changes (This option uses the unexposed API)
     */
    watchInternalFileChanges: boolean;

    /**
     * Suppress notification of hidden files change.
     */
    suppressNotifyHiddenFilesChange: boolean;
}

// Plugin Sync Settings

export const MODE_SELECTIVE = 0;
export const MODE_AUTOMATIC = 1;
export const MODE_PAUSED = 2;
export const MODE_SHINY = 3;
export type SYNC_MODE = typeof MODE_SELECTIVE | typeof MODE_AUTOMATIC | typeof MODE_PAUSED | typeof MODE_SHINY;

export interface PluginSyncSettingEntry {
    key: string;
    mode: SYNC_MODE;
    files: string[];
}

/**
 * Interface representing the settings for plugin synchronisation.
 */
interface PluginSyncSettings {
    /**
     * Indicates whether plugin synchronisation is enabled.
     */
    usePluginSync: boolean;

    /**
     * Indicates whether plugin settings synchronisation is enabled.
     */
    usePluginSettings: boolean;

    /**
     * Indicates whether to show the device's own plugins.
     */
    showOwnPlugins: boolean;

    /**
     * Indicates whether to automatically scan plugins.
     */
    autoSweepPlugins: boolean;

    /**
     * Indicates whether to periodically scan plugins automatically.
     */
    autoSweepPluginsPeriodic: boolean;

    /**
     * Indicates whether to notify when a plugin or setting is updated.
     */
    notifyPluginOrSettingUpdated: boolean;

    /**
     * The name of the device and vault.
     * This is used to identify the device and vault among synchronised devices and vaults.
     * Hence, this should be unique among devices and vaults.
     */
    deviceAndVaultName: string;

    /**
     * Indicates whether the v2 of plugin synchronisation is enabled.
     */
    usePluginSyncV2: boolean;

    /**
     * Indicates whether additional plugin synchronisation settings are enabled.
     * This setting is hidden from the UI.
     */
    usePluginEtc: boolean;

    /**
     * Extended settings for plugin synchronisation.
     */
    pluginSyncExtendedSetting: Record<PluginSyncSettingEntry["key"], PluginSyncSettingEntry>;
}

/**
 * Interface representing the user interface settings.
 */
interface UISettings {
    /**
     * Indicates whether verbose logging has been enabled.
     */
    showVerboseLog: boolean;

    /**
     * Indicates whether less information should be shown in the log.
     */
    lessInformationInLog: boolean;

    /**
     * Indicates whether longer status line should be shown inside the editor.
     */
    showLongerLogInsideEditor: boolean;

    /**
     * Indicates whether the status line should be shown on the editor.
     */
    showStatusOnEditor: boolean;

    /**
     * Indicates whether the status line should be shown on the status bar.
     */
    showStatusOnStatusbar: boolean;

    /**
     * Indicates whether only icons instead of status line should be shown on the editor.
     */
    showOnlyIconsOnEditor: boolean;

    /**
     * The language to be used for display.
     */
    displayLanguage: I18N_LANGS;
}

/**
 * Interface representing the settings for mode of exposing advanced things.
 */
interface ModeSettings {
    /**
     * Indicates whether the advanced mode is enabled.
     */
    useAdvancedMode: boolean;

    /**
     * Indicates whether the power user mode is enabled.
     */
    usePowerUserMode: boolean;

    /**
     * Indicates whether the edge case mode is enabled.
     */
    useEdgeCaseMode: boolean;
}

/**
 * Interface representing the settings for debug mode.
 */
interface DebugModeSettings {
    /**
     * Indicates whether the debug tools of Self-hosted LiveSync are enabled.
     */
    enableDebugTools: boolean;
    /**
     * Indicates whether to write log to the file.
     */
    writeLogToTheFile: boolean;
}

/**
 * Interface representing additional tweak settings.
 */
interface ExtraTweakSettings {
    /**
     * The threshold value for notifying about the size of remote storage.
     * When the size of the remote storage exceeds this threshold, a notification will be triggered.
     */
    notifyThresholdOfRemoteStorageSize: number;
}

/**
 * Interface representing the settings for beta tweaks.
 */
interface BetaTweakSettings {
    /**
     * Indicates whether to disable the WebWorker for generating chunks.
     */
    disableWorkerForGeneratingChunks: boolean;

    /**
     * Indicates whether to process small files in the UI thread.
     */
    processSmallFilesInUIThread: boolean;

    /**
     * Indicates whether to enable the version 2 of the chunk splitter.
     */
    enableChunkSplitterV2: boolean;
}

/**
 * Interface representing the settings for synchronising settings via file.
 */
interface SettingSyncSettings {
    /**
     * The file path where the settings is stored.
     */
    settingSyncFile: string;

    /**
     * Indicates whether to write credentials for settings synchronising.
     */
    writeCredentialsForSettingSync: boolean;

    /**
     * Indicates whether to notify all settings synchronising files events.
     */
    notifyAllSettingSyncFile: boolean;
}

/**
 * Represents settings that are considered obsolete and are not configurable from the UI.
 */
interface ObsoleteSettings {
    /**
     * Saving delay (in milliseconds).
     */
    savingDelay: number; // Not Configurable from the UI Now.
    /**
     * Garbage collection delay (in milliseconds). Now, no longer GC is implemented.
     */
    gcDelay: number;
    /**
     * Skip older files on sync. No effect now.
     */
    skipOlderFilesOnSync: boolean;
    /**
     * Use the IndexedDB adapter. Now always true. Should be.
     */
    useIndexedDBAdapter: boolean;
}

export const SETTING_VERSION_INITIAL = 0;
export const SETTING_VERSION_SUPPORT_CASE_INSENSITIVE = 10;
export const CURRENT_SETTING_VERSION = SETTING_VERSION_SUPPORT_CASE_INSENSITIVE;

/**
 * Interface representing some data stored in the settings for the plugin.
 */
interface DataOnSettings {
    /**
     * VersionUp flash message which is shown when some incompatible changes are made during the update.
     */
    versionUpFlash: string;
    /**
     * Setting file version, to migrate the settings.
     */
    settingVersion: number;
    /**
     * Indicates whether the setting of the plug-in is configured once.
     */
    isConfigured?: boolean;
    /**
     * The user-last-read version number.
     */
    lastReadUpdates: number;

    /**
     * The last checked version by the doctor.
     */
    doctorProcessedVersion: string;
}

/**
 * Interface representing the settings for a safety valve mechanism.
 */
interface SafetyValveSettings {
    /**
     * Indicates whether file watching should be suspended.
     */
    suspendFileWatching: boolean;

    /**
     * Indicates whether parsing and reflecting of replication results should be suspended.
     */
    suspendParseReplicationResult: boolean;

    /**
     * Indicates whether suspension should be avoided during fetching operations.
     */
    doNotSuspendOnFetching: boolean;
}

/**
 * Represents the settings required to synchronise with a bucket.
 */
export interface BucketSyncSetting {
    /**
     * The access key to use when connecting to the bucket.
     */
    accessKey: string;
    /**
     * The secret to use when connecting to the bucket.
     */
    secretKey: string;
    /**
     * The name of bucket to use.
     */
    bucket: string;
    /**
     * The region of the bucket.
     */
    region: string;
    /**
     * The endpoint of the bucket.
     */
    endpoint: string;
    /**
     * Indicates whether to use a custom request handler.
     * (This is for CORS issue).
     */
    useCustomRequestHandler: boolean;
}

// Remote Type
export const REMOTE_COUCHDB = "";
export const REMOTE_MINIO = "MINIO";

//
export const REMOTE_P2P = "ONLY_P2P";

export type RemoteType = typeof REMOTE_COUCHDB | typeof REMOTE_MINIO | typeof REMOTE_P2P;

export enum AutoAccepting {
    NONE = 0,
    ALL = 1,
}

export interface P2PSyncSetting {
    P2P_Enabled: boolean;
    /**
     * Nostr relay server URL. (Comma separated list)
     * This is only for the channelling server to establish for the P2P connection.
     * No data is transferred through this server.
     */
    P2P_relays: string;
    /**
     * The room ID for `your devices`. This should be unique among the users.
     * (Or, lines will be got mixed up).
     */
    P2P_roomID: string;
    /**
     * The passphrase for your devices.
     * It can be empty, but it will help you if you have a duplicate Room ID.
     */
    P2P_passphrase: string;
    P2P_AutoAccepting: AutoAccepting;
    P2P_AutoStart: boolean;
    P2P_AutoBroadcast: boolean;
    P2P_AutoSyncPeers: string;
    P2P_AutoWatchPeers: string;
    P2P_SyncOnReplication: string;
    P2P_AppID: string;
    P2P_RebuildFrom: string;
}

export const P2P_DEFAULT_SETTINGS: P2PSyncSetting = {
    P2P_Enabled: false,
    P2P_AutoAccepting: AutoAccepting.NONE,
    P2P_AppID: "self-hosted-livesync",
    P2P_roomID: "",
    P2P_passphrase: "",
    P2P_relays: "wss://exp-relay.vrtmrz.net/",
    P2P_AutoBroadcast: false,
    P2P_AutoStart: false,
    P2P_AutoSyncPeers: "",
    P2P_AutoWatchPeers: "",
    P2P_SyncOnReplication: "",
    P2P_RebuildFrom: "",
} as const;

/**
 * Interface representing the settings for a remote type.
 */
export interface RemoteTypeSettings {
    /**
     * The type of the remote.
     */
    remoteType: RemoteType;
}

/**
 * Represents the settings used for End-to-End encryption.
 */
interface EncryptionSettings {
    /**
     * Indicates whether E2EE is enabled.
     */
    encrypt: boolean;

    /**
     * The passphrase used for E2EE.
     */
    passphrase: string;

    /**
     * Indicates whether path obfuscation is used.
     * If not, the path will be stored as it is, as the document ID.
     */
    usePathObfuscation: boolean;
}

// Note: xxhash32 is obsolete and not preferred since v0.24.7.
export type HashAlgorithm = "" | "xxhash32" | "xxhash64" | "mixed-purejs" | "sha1";

/**
 * Interface representing the settings for chunk processing.
 */
interface ChunkSettings {
    /**
     * The algorithm used for hashing chunks.
     */
    hashAlg: HashAlgorithm;

    /**
     * The minimum size of a chunk in chars.
     */
    minimumChunkSize: number;

    /**
     * The custom size of a chunk.
     * Note: This value used as a coefficient for the normal chunk size.
     */
    customChunkSize: number;

    /**
     * The threshold for considering a line as long.
     * (Not respected in v0.24.x).
     */
    longLineThreshold: number;

    /**
     * Flag indicating whether to use a segmenter for chunking.
     */
    useSegmenter: boolean;

    /**
     * Flag indicating whether to enable version 2 of the chunk splitter.
     */
    enableChunkSplitterV2: boolean;

    /**
     * Flag indicating whether to avoid using a fixed revision for chunks.
     */
    doNotUseFixedRevisionForChunks: boolean;
}

/**
 * Settings for on-demand chunk fetching.
 */
interface OnDemandChunkSettings {
    /**
     * Indicates whether chunks should be fetch online.
     */
    readChunksOnline: boolean;

    /**
     * The number of concurrent chunk reads allowed when fetching online.
     */
    concurrencyOfReadChunksOnline: number;

    /**
     * The minimum interval (in milliseconds) between consecutive online chunk fetching.
     */
    minimumIntervalOfReadChunksOnline: number;

    // Note: If concurrency is 3, the fetching will be like:
    // 1: |---> |---->   |----> ---->
    // 2:     |----> |---->    |----> |--- ->
    // 3:         |------> |--->    |----> |---->
    // ============================================
    //    |   | | |  |   | |   |    | |    |  <- Request starts
    // All intervals between requests should be more than minimumIntervalOfReadChunksOnline.
    // This is mainly for avoiding the 429 error on Cloudant or some other rate limiting gateways. CouchDB could accept more connections.
}

/**
 * Configuration settings for Eden.
 */
interface EdenSettings {
    /**
     * Indicates whether Eden is enabled.
     */
    useEden: boolean;

    /**
     * The maximum number of chunks allowed in Eden.
     */
    maxChunksInEden: number;

    /**
     * The maximum total length allowed in Eden.
     */
    maxTotalLengthInEden: number;

    /**
     * The maximum age allowed in Eden.
     */
    maxAgeInEden: number;
}

/**
 * Interface representing obsolete settings for an remote database.
 */
interface ObsoleteRemoteDBSettings {
    /**
     * Indicates whether to check the integrity of the data on save.
     */
    checkIntegrityOnSave: boolean;

    /**
     * Indicates whether to use history tracking.
     * (Now always true)
     */
    useHistory: boolean;

    /**
     * Indicates whether to disable using API of Obsidian.
     * (Now always true: Note: Obsidian cannot handle multiple requests at the same time).
     */
    disableRequestURI: boolean;

    /**
     * Indicates whether to send data in bulk chunks.
     */
    sendChunksBulk: boolean;

    /**
     * The maximum size of the bulk chunks to be sent.
     */
    sendChunksBulkMaxSize: number;

    /**
     * Indicates whether to use a dynamic iteration count.
     */
    useDynamicIterationCount: boolean;

    /**
     * Indicates weather to pace the replication processing interval.
     * Now (v0.24.x) not be respected.
     */
    doNotPaceReplication: boolean;
}

/**
 * Interface representing the settings for beta tweaks for the remote database.
 */
interface BetaRemoteDBSettings {
    /**
     * Indicates whether compression is enabled for the remote database.
     */
    enableCompression: boolean;
}
/**
 * Interface representing the some data stored on the settings.
 */
interface DataOnRemoteDBSettings {
    /**
     * VersionUp flash message which is shown when some incompatible changes are made during the update.
     */
    versionUpFlash: string;
}

/**
 * Interface representing the settings for replication.
 */
interface ReplicationSetting {
    /**
     * The maximum number of documents to be processed in a batch.
     */
    batch_size: number;
    /**
     * The maximum number of batches to be processed.
     */
    batches_limit: number;
}

/**
 * Interface representing the settings for targetting files.
 */
interface FileHandlingSettings {
    /**
     * The regular expression for files to be synchronised.
     */
    syncOnlyRegEx: string;
    /**
     * The regular expression for files to be ignored during synchronisation.
     */
    syncIgnoreRegEx: string;
}

/**
 * Interface representing the settings for processing behaviour.
 */
interface ProcessingBehaviourSettings {
    /**
     * Hash cache maximum count.
     */
    hashCacheMaxCount: number;
    /**
     * Hash cache maximum amount.
     */
    hashCacheMaxAmount: number;
}

/**
 * Interface representing the settings for remote database tweaks.
 */
interface RemoteDBTweakSettings {
    /**
     * Indicates whether to ignore the version check.
     */
    ignoreVersionCheck: boolean;
    /**
     * Indicates whether to ignore and continue syncing even if the configuration-mismatch is detected.
     * (Note: Mismatched settings can lead to inappropriate de-duplication, leading to storage wastage and increased traffic).
     */
    disableCheckingConfigMismatch: boolean;
}

/**
 * Interface representing the settings for optional and not exposed remote database settings.
 */
interface OptionalAndNotExposedRemoteDBSettings {
    /**
     * Indicates whether to accept empty passphrase.
     * This not meant to `Not be encrypted`, but `Be encrypted with empty passphrase`.
     */
    permitEmptyPassphrase: boolean;
}

/**
 * Interface representing the settings for cross-platform interoperability.
 */
interface CrossPlatformInteroperabilitySettings {
    /**
     * Indicates whether to handle filename case sensitively.
     */
    handleFilenameCaseSensitive: boolean;
}

/**
 * Interface representing the settings for conflict handling.
 */
interface ConflictHandlingSettings {
    /**
     * Indicates whether to check conflicts only on file open.
     */
    checkConflictOnlyOnOpen: boolean;

    /**
     * Indicates whether to show the merge dialog only on active file.
     */
    showMergeDialogOnlyOnActive: boolean;
}

/**
 * Settings that define the behavior of the merge process.
 */
interface MergeBehaviourSettings {
    /**
     * Indicates whether to synchronise after merging.
     */
    syncAfterMerge: boolean;

    /**
     * Determines if conflicts should be resolved by choosing the newer file.
     */
    resolveConflictsByNewerFile: boolean;

    /**
     * Specifies whether to write documents even if there are conflicts.
     */
    writeDocumentsIfConflicted: boolean;

    /**
     * Disables automatic merging of markdown files.
     */
    disableMarkdownAutoMerge: boolean;
}

/**
 * Configuration settings for handling edge cases in the application.
 */
interface EdgeCaseHandlingSettings {
    /**
     * An optional suffix to append to the database name after the vault name.
     */
    additionalSuffixOfDatabaseName: string | undefined;

    /**
     * Flag to disable the worker thread for generating chunks.
     */
    disableWorkerForGeneratingChunks: boolean;

    /**
     * Flag to process small files in the UI thread instead of a worker thread.
     */
    processSmallFilesInUIThread: boolean;

    /**
     * Indicates whether to use timeout for PouchDB replication.
     */
    useTimeouts: boolean;
}

/**
 * Configuration settings for handling deleted files.
 */
interface DeletedFileMetadataSettings {
    /**
     * Indicates whether to delete metadata of deleted files.
     */
    deleteMetadataOfDeletedFiles: boolean;
    /**
     * The number of days to wait before automatically deleting metadata of deleted files.
     */
    automaticallyDeleteMetadataOfDeletedFiles: number;
}

interface ObsidianLiveSyncSettings_PluginSetting
    extends SyncMethodSettings,
        UISettings,
        FileHandlingSettings,
        MergeBehaviourSettings,
        EncryptedUserSettings,
        PeriodicReplicationSettings,
        InternalFileSettings,
        PluginSyncSettings,
        ModeSettings,
        ExtraTweakSettings,
        BetaTweakSettings,
        ObsoleteSettings,
        DebugModeSettings,
        SettingSyncSettings,
        SafetyValveSettings,
        DataOnSettings {}

export type RemoteDBSettings = CouchDBConnection &
    BucketSyncSetting &
    RemoteTypeSettings &
    EncryptionSettings &
    ChunkSettings &
    EdenSettings &
    DataOnRemoteDBSettings &
    ObsoleteRemoteDBSettings &
    OnDemandChunkSettings &
    BetaRemoteDBSettings &
    ReplicationSetting &
    RemoteDBTweakSettings &
    FileHandlingSettings &
    ProcessingBehaviourSettings &
    OptionalAndNotExposedRemoteDBSettings &
    CrossPlatformInteroperabilitySettings &
    ConflictHandlingSettings &
    EdgeCaseHandlingSettings &
    DeletedFileMetadataSettings &
    P2PSyncSetting;

export type ObsidianLiveSyncSettings = ObsidianLiveSyncSettings_PluginSetting & RemoteDBSettings;

export const DEFAULT_SETTINGS: ObsidianLiveSyncSettings = {
    remoteType: REMOTE_COUCHDB,
    useCustomRequestHandler: false,
    couchDB_URI: "",
    couchDB_USER: "",
    couchDB_PASSWORD: "",
    couchDB_DBNAME: "",
    liveSync: false,
    syncOnSave: false,
    syncOnStart: false,
    savingDelay: 200,
    lessInformationInLog: false,
    gcDelay: 300,
    versionUpFlash: "",
    minimumChunkSize: 20,
    longLineThreshold: 250,
    showVerboseLog: false,
    suspendFileWatching: false,
    trashInsteadDelete: true,
    periodicReplication: false,
    periodicReplicationInterval: 60,
    syncOnFileOpen: false,
    encrypt: false,
    passphrase: "",
    usePathObfuscation: false,
    doNotDeleteFolder: false,
    resolveConflictsByNewerFile: false,
    batchSave: false,
    batchSaveMinimumDelay: 5,
    batchSaveMaximumDelay: 60,
    deviceAndVaultName: "",
    usePluginSettings: false,
    showOwnPlugins: false,
    showStatusOnEditor: true,
    showStatusOnStatusbar: true,
    showOnlyIconsOnEditor: false,
    usePluginSync: false,
    autoSweepPlugins: false,
    autoSweepPluginsPeriodic: false,
    notifyPluginOrSettingUpdated: false,
    checkIntegrityOnSave: false,
    batch_size: 25,
    batches_limit: 25,
    useHistory: false,
    disableRequestURI: false,
    skipOlderFilesOnSync: true,
    checkConflictOnlyOnOpen: false,
    showMergeDialogOnlyOnActive: false,
    syncInternalFiles: false,
    syncInternalFilesBeforeReplication: false,
    syncInternalFilesIgnorePatterns: "\\/node_modules\\/, \\/\\.git\\/, \\/obsidian-livesync\\/",
    syncInternalFilesInterval: 60,
    additionalSuffixOfDatabaseName: "",
    ignoreVersionCheck: false,
    lastReadUpdates: 0,
    deleteMetadataOfDeletedFiles: false,
    syncIgnoreRegEx: "",
    syncOnlyRegEx: "",
    customChunkSize: 0,
    readChunksOnline: true,
    watchInternalFileChanges: true,
    automaticallyDeleteMetadataOfDeletedFiles: 0,
    disableMarkdownAutoMerge: false,
    writeDocumentsIfConflicted: false,
    useDynamicIterationCount: false,
    syncAfterMerge: false,
    configPassphraseStore: "",
    encryptedPassphrase: "",
    encryptedCouchDBConnection: "",
    permitEmptyPassphrase: false,
    useIndexedDBAdapter: true,
    useTimeouts: false,
    writeLogToTheFile: false,
    doNotPaceReplication: false,
    hashCacheMaxCount: 300,
    hashCacheMaxAmount: 50,
    concurrencyOfReadChunksOnline: 40,
    minimumIntervalOfReadChunksOnline: 50,
    hashAlg: "xxhash64",
    suspendParseReplicationResult: false,
    doNotSuspendOnFetching: false,
    useIgnoreFiles: false,
    ignoreFiles: ".gitignore",
    syncOnEditorSave: false,
    pluginSyncExtendedSetting: {},
    syncMaxSizeInMB: 50,
    settingSyncFile: "",
    writeCredentialsForSettingSync: false,
    notifyAllSettingSyncFile: false,
    isConfigured: undefined,
    settingVersion: CURRENT_SETTING_VERSION,
    enableCompression: false,
    accessKey: "",
    bucket: "",
    endpoint: "",
    region: "auto",
    secretKey: "",
    useEden: false,
    maxChunksInEden: 10,
    maxTotalLengthInEden: 1024,
    maxAgeInEden: 10,
    disableCheckingConfigMismatch: false,
    displayLanguage: "",
    enableChunkSplitterV2: false,
    disableWorkerForGeneratingChunks: false,
    processSmallFilesInUIThread: false,
    notifyThresholdOfRemoteStorageSize: -1,

    usePluginSyncV2: false,
    usePluginEtc: false,
    handleFilenameCaseSensitive: undefined!,
    doNotUseFixedRevisionForChunks: true,
    showLongerLogInsideEditor: false,
    sendChunksBulk: false,
    sendChunksBulkMaxSize: 1,
    useSegmenter: false,
    useAdvancedMode: false,
    usePowerUserMode: false,
    useEdgeCaseMode: false,
    enableDebugTools: false,
    suppressNotifyHiddenFilesChange: false,
    syncMinimumInterval: 2000,
    ...P2P_DEFAULT_SETTINGS,
    doctorProcessedVersion: "",
};

export interface HasSettings<T extends Partial<ObsidianLiveSyncSettings>> {
    settings: T;
}

export const PREFERRED_SETTING_CLOUDANT: Partial<ObsidianLiveSyncSettings> = {
    syncMaxSizeInMB: 50,
    customChunkSize: 0,
    sendChunksBulkMaxSize: 1,
    concurrencyOfReadChunksOnline: 100,
    minimumIntervalOfReadChunksOnline: 333,
    doNotUseFixedRevisionForChunks: true,
    useSegmenter: true,
    usePluginSyncV2: true,
    handleFilenameCaseSensitive: false,
};
export const PREFERRED_SETTING_SELF_HOSTED: Partial<ObsidianLiveSyncSettings> = {
    ...PREFERRED_SETTING_CLOUDANT,
    customChunkSize: 50,
    sendChunksBulkMaxSize: 1,
    concurrencyOfReadChunksOnline: 30,
    minimumIntervalOfReadChunksOnline: 25,
};
export const PREFERRED_JOURNAL_SYNC: Partial<ObsidianLiveSyncSettings> = {
    ...PREFERRED_SETTING_CLOUDANT,
    customChunkSize: 10,
    concurrencyOfReadChunksOnline: 30,
    minimumIntervalOfReadChunksOnline: 25,
};

export const PREFERRED_SETTING_PERFORMANT: Partial<ObsidianLiveSyncSettings> = {
    useSegmenter: true,
};

/**
 * Represents an entry in the database.
 */
export interface DatabaseEntry {
    /**
     * The ID of the document.
     */
    _id: DocumentID;

    /**
     * The revision of the document.
     */
    _rev?: string;

    /**
     * Deleted flag.
     */
    _deleted?: boolean;

    /**
     * Conflicts (if exists).
     */
    _conflicts?: string[];
}

/**
 * Represents the base structure for an entry that represents a file.
 */
export type EntryBase = {
    /**
     * The creation time of the file.
     */
    ctime: number;
    /**
     * The modification time of the file.
     */
    mtime: number;
    /**
     * The size of the file.
     */
    size: number;
    /**
     * Deleted flag.
     */
    deleted?: boolean;
};

export type EdenChunk = {
    data: string;
    epoch: number;
};

export type EntryWithEden = {
    eden: Record<DocumentID, EdenChunk>;
};

export type NoteEntry = DatabaseEntry &
    EntryBase &
    EntryWithEden & {
        /**
         * The path of the file.
         */
        path: FilePathWithPrefix;
        /**
         * Contents of the file.
         */
        data: string | string[];
        /**
         * The type of the entry.
         */
        type: "notes";
    };

export type NewEntry = DatabaseEntry &
    EntryBase &
    EntryWithEden & {
        /**
         * The path of the file.
         */
        path: FilePathWithPrefix;
        /**
         * Chunk IDs indicating the contents of the file.
         */
        children: string[];
        /**
         * The type of the entry.
         */
        type: "newnote";
    };
export type PlainEntry = DatabaseEntry &
    EntryBase &
    EntryWithEden & {
        /**
         * The path of the file.
         */
        path: FilePathWithPrefix;
        /**
         * Chunk IDs indicating the contents of the file.
         */
        children: string[];
        /**
         * The type of the entry.
         */
        type: "plain";
    };

export type InternalFileEntry = DatabaseEntry &
    NewEntry &
    EntryBase & {
        deleted?: boolean;
        // type: "newnote";
    };

export type AnyEntry = NoteEntry | NewEntry | PlainEntry | InternalFileEntry;

export type LoadedEntry = AnyEntry & {
    data: string | string[];
    datatype: "plain" | "newnote";
};
export type SavingEntry = AnyEntry & {
    data: Blob;
    datatype: "plain" | "newnote";
};

export type MetaEntry = AnyEntry & {
    children: string[];
    // datatype: "plain" | "newnote";
};
export function isMetaEntry(entry: AnyEntry): entry is MetaEntry {
    return "children" in entry;
}

export type EntryLeaf = DatabaseEntry & {
    type: "leaf";
    data: string;
    isCorrupted?: boolean;
    // received?: boolean;
};

export type EntryChunkPack = DatabaseEntry & {
    type: "chunkpack";
    data: string; //Record<string, string>;
};

export interface EntryVersionInfo extends DatabaseEntry {
    type: "versioninfo";
    version: number;
}
export interface EntryHasPath {
    path: FilePathWithPrefix | FilePath;
}
export interface ChunkVersionRange {
    min: number; //lower compatible chunk format version
    max: number; //maximum compatible chunk format version.
    current: number; //current chunk version.
}

export const TweakValuesShouldMatchedTemplate: Partial<ObsidianLiveSyncSettings> = {
    minimumChunkSize: 20,
    longLineThreshold: 250,
    encrypt: false,
    usePathObfuscation: false,
    enableCompression: false,
    useEden: false,
    customChunkSize: 0,
    useDynamicIterationCount: false,
    hashAlg: "xxhash64",
    enableChunkSplitterV2: true,
    maxChunksInEden: 10,
    maxTotalLengthInEden: 1024,
    maxAgeInEden: 10,
    usePluginSyncV2: false,
    handleFilenameCaseSensitive: false,
    doNotUseFixedRevisionForChunks: true,
    useSegmenter: false,
};

type TweakKeys = keyof TweakValues;

export const IncompatibleChanges: TweakKeys[] = [
    "encrypt",
    "usePathObfuscation",
    "useDynamicIterationCount",
    "handleFilenameCaseSensitive",
] as const;

export const CompatibleButLossyChanges: TweakKeys[] = ["hashAlg"];

type IncompatibleRecommendationPatterns<T extends TweakKeys> = {
    key: T;
    isRecommendation?: boolean;
} & (
    | {
          from: TweakValues[T];
          to: TweakValues[T];
      }
    | {
          from: TweakValues[T];
      }
    | {
          to: TweakValues[T];
      }
);

export const IncompatibleChangesInSpecificPattern: IncompatibleRecommendationPatterns<TweakKeys>[] = [
    { key: "doNotUseFixedRevisionForChunks", from: true, to: false, isRecommendation: true },
    { key: "doNotUseFixedRevisionForChunks", to: true, isRecommendation: false },
] as const;

export const TweakValuesRecommendedTemplate: Partial<ObsidianLiveSyncSettings> = {
    useIgnoreFiles: false,
    useCustomRequestHandler: false,

    batch_size: 25,
    batches_limit: 25,
    useIndexedDBAdapter: true,
    useTimeouts: false,
    readChunksOnline: true,
    hashCacheMaxCount: 300,
    hashCacheMaxAmount: 50,
    concurrencyOfReadChunksOnline: 40,
    minimumIntervalOfReadChunksOnline: 50,
    ignoreFiles: ".gitignore",
    syncMaxSizeInMB: 50,
    enableChunkSplitterV2: true,
    usePluginSyncV2: true,
    handleFilenameCaseSensitive: false,
    doNotUseFixedRevisionForChunks: false,
};
export const TweakValuesDefault: Partial<ObsidianLiveSyncSettings> = {
    usePluginSyncV2: false,
};

export const configurationNames: Partial<Record<keyof ObsidianLiveSyncSettings, ConfigurationItem>> = {
    minimumChunkSize: {
        name: "Minimum Chunk Size (Not Configurable from the UI Now).",
    },
    longLineThreshold: {
        name: "Longest chunk line threshold value (Not Configurable from the UI Now).",
    },
    encrypt: {
        name: "End-to-End Encryption",
        desc: "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.",
    },
    usePathObfuscation: {
        name: "Path Obfuscation",
    },
    enableCompression: {
        name: "Data Compression",
        status: "EXPERIMENTAL",
    },
    useEden: {
        name: "Incubate Chunks in Document",
        desc: "If enabled, newly created chunks are temporarily kept within the document, and graduated to become independent chunks once stabilised.",
        status: "BETA",
    },
    customChunkSize: {
        name: "Enhance chunk size",
    },
    useDynamicIterationCount: {
        name: "Use dynamic iteration count",
        status: "EXPERIMENTAL",
    },
    hashAlg: {
        name: "The Hash algorithm for chunk IDs",
        status: "EXPERIMENTAL",
    },
    enableChunkSplitterV2: {
        name: "Use splitting-limit-capped chunk splitter",
        desc: "If enabled, chunks will be split into no more than 100 items. However, dedupe is slightly weaker.",
    },
    maxChunksInEden: {
        name: "Maximum Incubating Chunks",
        desc: "The maximum number of chunks that can be incubated within the document. Chunks exceeding this number will immediately graduate to independent chunks.",
    },
    maxTotalLengthInEden: {
        name: "Maximum Incubating Chunk Size",
        desc: "The maximum total size of chunks that can be incubated within the document. Chunks exceeding this size will immediately graduate to independent chunks.",
    },
    maxAgeInEden: {
        name: "Maximum Incubation Period",
        desc: "The maximum duration for which chunks can be incubated within the document. Chunks exceeding this period will graduate to independent chunks.",
    },
    usePluginSyncV2: {
        name: "Per-file-saved customization sync",
        desc: "If enabled per-filed efficient customization sync will be used. We need a small migration when enabling this. And all devices should be updated to v0.23.18. Once we enabled this, we lost a compatibility with old versions.",
    },
    handleFilenameCaseSensitive: {
        name: "Handle files as Case-Sensitive",
        desc: "If this enabled, All files are handled as case-Sensitive (Previous behaviour).",
    },
    doNotUseFixedRevisionForChunks: {
        name: "Compute revisions for chunks (Previous behaviour)",
        desc: "If this enabled, all chunks will be stored with the revision made from its content. (Previous behaviour)",
    },
    useSegmenter: {
        name: "Use Segmented-splitter",
        desc: "If this enabled, chunks will be split into semantically meaningful segments. Not all platforms support this feature.",
    },
};

export const LEVEL_ADVANCED = "ADVANCED";
export const LEVEL_POWER_USER = "POWER_USER";
export const LEVEL_EDGE_CASE = "EDGE_CASE";
export type ConfigLevel = "" | "ADVANCED" | "POWER_USER" | "EDGE_CASE";
export type ConfigurationItem = {
    name: string;
    desc?: string;
    placeHolder?: string;
    status?: "BETA" | "ALPHA" | "EXPERIMENTAL";
    obsolete?: boolean;
    level?: ConfigLevel;
};

/**
 * Get human readable Configuration stability
 * @param status
 * @returns
 */
export function statusDisplay(status?: string): string {
    if (!status) return "";
    if (status == "EXPERIMENTAL") return ` (Experimental)`;
    if (status == "ALPHA") return ` (Alpha)`;
    if (status == "BETA") return ` (Beta)`;
    return ` (${status})`;
}

/**
 * Get human readable configuration name.
 * @param key configuration key
 * @param alt
 * @returns
 */
export function confName(key: keyof ObsidianLiveSyncSettings, alt: string = "") {
    if (key in configurationNames) {
        return `${configurationNames[key]?.name}${statusDisplay(configurationNames[key]?.status)}`;
    } else {
        return `${alt || ""}`;
    }
}

/**
 * Get human readable configuration description.
 * @param key configuration key
 * @param alt
 * @returns
 */
export function confDesc(key: keyof ObsidianLiveSyncSettings, alt?: string) {
    if (key in configurationNames) {
        if (configurationNames[key]?.desc) {
            return `${configurationNames[key]?.name}${statusDisplay(configurationNames[key]?.status)}`;
        }
        return alt;
    } else {
        return alt;
    }
}
export const TweakValuesTemplate = { ...TweakValuesRecommendedTemplate, ...TweakValuesShouldMatchedTemplate };
export type TweakValues = typeof TweakValuesTemplate;

export const DEVICE_ID_PREFERRED = "PREFERRED";

export interface EntryMilestoneInfo extends DatabaseEntry {
    _id: typeof MILESTONE_DOCID;
    type: "milestoneinfo";
    created: number;
    accepted_nodes: string[];
    locked: boolean;
    cleaned?: boolean;
    node_chunk_info: { [key: string]: ChunkVersionRange };
    tweak_values: { [key: string]: TweakValues };
}

export interface EntryNodeInfo extends DatabaseEntry {
    _id: typeof NODEINFO_DOCID;
    type: "nodeinfo";
    nodeid: string;
    v20220607?: boolean;
}

export type EntryBody = NoteEntry | NewEntry | PlainEntry | InternalFileEntry;

export type EntryDoc =
    | EntryBody
    | LoadedEntry
    | EntryLeaf
    | EntryVersionInfo
    | EntryMilestoneInfo
    | EntryNodeInfo
    | EntryChunkPack;

export type diff_result_leaf = {
    rev: string;
    data: string;
    ctime: number;
    mtime: number;
    deleted?: boolean;
};
export type dmp_result = Array<[number, string]>;

export type diff_result = {
    left: diff_result_leaf;
    right: diff_result_leaf;
    diff: dmp_result;
};

export type DIFF_CHECK_RESULT_AUTO =
    | typeof CANCELLED
    | typeof AUTO_MERGED
    | typeof NOT_CONFLICTED
    | typeof MISSING_OR_ERROR;

export type diff_check_result = DIFF_CHECK_RESULT_AUTO | diff_result;

export type Credential = {
    username: string;
    password: string;
};

export type EntryDocResponse = EntryDoc & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export type DatabaseConnectingStatus =
    | "STARTED"
    | "NOT_CONNECTED"
    | "PAUSED"
    | "CONNECTED"
    | "COMPLETED"
    | "CLOSED"
    | "ERRORED"
    | "JOURNAL_SEND"
    | "JOURNAL_RECEIVE";

export const PREFIXMD_LOGFILE = "livesync_log_";
export const PREFIXMD_LOGFILE_UC = "LIVESYNC_LOG_";

export const FLAGMD_REDFLAG = "redflag.md" as FilePath;
export const FLAGMD_REDFLAG2 = "redflag2.md" as FilePath;
export const FLAGMD_REDFLAG2_HR = "flag_rebuild.md" as FilePath;
export const FLAGMD_REDFLAG3 = "redflag3.md" as FilePath;
export const FLAGMD_REDFLAG3_HR = "flag_fetch.md" as FilePath;
export const SYNCINFO_ID = "syncinfo" as DocumentID;

export interface SyncInfo extends DatabaseEntry {
    _id: typeof SYNCINFO_ID;
    type: "syncinfo";
    data: string;
}

export const SALT_OF_PASSPHRASE = "rHGMPtr6oWw7VSa3W3wpa8fT8U";
export const SALT_OF_ID = "a83hrf7f\u0003y7sa8g31";
export const SEED_MURMURHASH = 0x12345678;

export const PREFIX_OBFUSCATED = "f:";
export const PREFIX_CHUNK = "h:";
export const PREFIX_ENCRYPTED_CHUNK = "h:+";

export type UXStat = {
    size: number;
    mtime: number;
    ctime: number;
    type: "file" | "folder";
};

export type UXFileInfo = UXFileInfoStub & {
    body: Blob;
};
// export type UXFileInfoStub = UXFileFileInfoStub;
export type UXAbstractInfoStub = UXFileInfoStub | UXFolderInfo;

export type UXFileInfoStub = {
    name: string;
    path: FilePath | FilePathWithPrefix;
    stat: UXStat;
    deleted?: boolean;
    isFolder?: false;
    isInternal?: boolean;
};
export type UXInternalFileInfoStub = {
    name: string;
    path: FilePath | FilePathWithPrefix;
    deleted?: boolean;
    isFolder?: false;
    isInternal: true;
    stat: undefined;
};

export type UXFolderInfo = {
    name: string;
    path: FilePath | FilePathWithPrefix;
    deleted?: boolean;
    isFolder: true;
    children: UXFileInfoStub[];
    parent: FilePath | FilePathWithPrefix | undefined;
};

export type UXDataWriteOptions = {
    /**
     * Time of creation, represented as a unix timestamp, in milliseconds.
     * Omit this if you want to keep the default behaviour.
     * @public
     * */
    ctime?: number;
    /**
     * Time of last modification, represented as a unix timestamp, in milliseconds.
     * Omit this if you want to keep the default behaviour.
     * @public
     */
    mtime?: number;
};

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

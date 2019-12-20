const UUID_VALIDATION_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validates given UUID
 * @param uuid - Bluetooth service UUID
 * @return {boolean} - true if UUID is valid, false otherwise
 */
const validateUuid = (uuid) => UUID_VALIDATION_REGEX.test(uuid);

export default validateUuid;

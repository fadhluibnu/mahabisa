<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'description'
    ];

    /**
     * Get a setting value by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public static function get(string $key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        return self::castValue($setting->value, $setting->type);
    }

    /**
     * Set a setting value
     *
     * @param string $key
     * @param mixed $value
     * @param string $group
     * @param string $type
     * @param string|null $description
     * @return Setting
     */
    public static function set(string $key, $value, string $group = 'general', string $type = 'string', ?string $description = null)
    {
        $setting = self::firstOrNew(['key' => $key]);
        $setting->value = $value;
        $setting->group = $group;
        $setting->type = $type;
        
        if ($description) {
            $setting->description = $description;
        }
        
        $setting->save();
        
        return $setting;
    }

    /**
     * Cast the stored value to its proper type
     *
     * @param mixed $value
     * @param string $type
     * @return mixed
     */
    public static function castValue($value, string $type)
    {
        switch ($type) {
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'integer':
                return (int) $value;
            case 'float':
                return (float) $value;
            case 'array':
                return json_decode($value, true);
            case 'json':
                return json_decode($value);
            default:
                return $value;
        }
    }
}

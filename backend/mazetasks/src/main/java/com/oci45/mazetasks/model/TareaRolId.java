package com.oci45.mazetasks.model;

import java.io.Serializable;
import java.util.Objects;

public class TareaRolId implements Serializable {

    private Long tareaId;
    private Long rolId;

    public TareaRolId() {}

    public TareaRolId(Long tareaId, Long rolId) {
        this.tareaId = tareaId;
        this.rolId = rolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TareaRolId)) return false;
        TareaRolId that = (TareaRolId) o;
        return Objects.equals(tareaId, that.tareaId) &&
               Objects.equals(rolId, that.rolId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tareaId, rolId);
    }
}
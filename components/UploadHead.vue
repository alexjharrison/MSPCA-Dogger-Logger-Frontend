<template>
  <div id="upload-head">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <input
        type="file"
        :name="uploadFieldName"
        :disabled="isSaving"
        @change="filesChange($event.target.name, $event.target.files)"
        accept="image/*"
        class="input-file"
      >
      <p v-if="isInitial">
        Drag your file(s) here to begin
        <br>or click to browse
      </p>
      <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>

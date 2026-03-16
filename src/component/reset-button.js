"use client"
import React from 'react'

export default function ResetButton() {
  
  return (
    <input type="button" onClick={() => window.location.reload()} name="Reset" className="btn btn-danger btn-sm" value="Reset"/>
  )
}